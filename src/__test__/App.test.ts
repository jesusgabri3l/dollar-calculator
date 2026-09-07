import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import App from '../App.vue';
import { convert, COP_TO_USD, USD_TO_COP } from '../composables/useCalculate';
import mockResponse from './mockApi.json';
import { server } from './setup';

const RATE = mockResponse.rates.COP;
const numberFormat = (value: number) =>
  value.toLocaleString('es-CO', { maximumFractionDigits: 2 });

const renderApp = async () => {
  render(App);
  await screen.findByText(/1 USD =/);
};

describe('Dollar Calculator', () => {
  it('converts the default amount from COP to USD once the rate loads', async () => {
    await renderApp();

    const expected = numberFormat(convert(100000, COP_TO_USD, RATE));
    expect(await screen.findByTestId('result')).toHaveTextContent(expected);
  });

  it('recalculates live as the amount changes, without a submit step', async () => {
    await renderApp();

    const input = screen.getByTestId('amount-input');
    await fireEvent.update(input, '25000');

    const expected = numberFormat(convert(25000, COP_TO_USD, RATE));
    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent(expected));
  });

  it('swaps direction and carries the previously shown result into the amount field', async () => {
    await renderApp();

    const resultBeforeSwap = convert(100000, COP_TO_USD, RATE);
    expect(screen.getByTestId('result')).toHaveTextContent(
      numberFormat(resultBeforeSwap),
    );

    const swapButton = screen.getByTestId('swap-button');
    await fireEvent.click(swapButton);

    expect(screen.getByLabelText('USD')).toBeInTheDocument();
    const carriedAmount = parseFloat(
      (screen.getByTestId('amount-input') as HTMLInputElement).value,
    );
    expect(carriedAmount).toBeCloseTo(resultBeforeSwap, 2);

    const expected = numberFormat(convert(carriedAmount, USD_TO_COP, RATE));
    expect(screen.getByTestId('result')).toHaveTextContent(expected);
  });

  it('shows a dash instead of a result when the amount is empty', async () => {
    await renderApp();

    const input = screen.getByTestId('amount-input');
    await fireEvent.update(input, '');

    expect(screen.getByTestId('result')).toHaveTextContent('—');
  });

  it('shows an error message when the rate request fails', async () => {
    server.use(
      http.get('https://open.er-api.com/v6/latest/USD', () => HttpResponse.error()),
    );

    render(App);

    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Parece que algo salio mal...',
    );
  });
});
