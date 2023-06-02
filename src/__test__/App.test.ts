import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '../App.vue';
import { COP_TO_EUR, EUR_TO_COP } from '../composables/useCalculate';

beforeEach(() => {
  render(App);
});
describe('COP TO USD Tests', () => {
  it('Should render COP TO USD components', () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('placeholder', 'Pesos');
    expect(inputEl).toHaveAttribute('type', 'number');

    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent('Calcular');
  });

  it('Should get the correct value with 10000', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);

    await userEvent.type(inputEl, '10000');
    expect(inputEl).toHaveValue(10000);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 2.29 USD')).toBeInTheDocument();
  });

  it('Should get the correct value with 25000', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);

    await userEvent.type(inputEl, '25000');
    expect(inputEl).toHaveValue(25000);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 5.71 USD')).toBeInTheDocument();
  });

  it('Should show error when no input provided', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);
    expect(inputEl).toHaveValue(null);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('Parece que algo salio mal...')).toBeInTheDocument();
  });
});

describe('USD TO COP Tests', () => {
  it('Should render USD TO COP components', () => {
    const inputEl = screen.getByTestId(`input-${EUR_TO_COP}`);
    const buttonEl = screen.getByTestId(`button-${EUR_TO_COP}`);

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('placeholder', 'Dolares');
    expect(inputEl).toHaveAttribute('type', 'number');

    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent('Calcular');
  });

  it('Should get the correct value with 3 USD', async () => {
    const inputEl = screen.getByTestId(`input-${EUR_TO_COP}`);
    const buttonEl = screen.getByTestId(`button-${EUR_TO_COP}`);

    await userEvent.type(inputEl, '3');
    expect(inputEl).toHaveValue(3);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 13127.25 COP')).toBeInTheDocument();
  });

  it('Should get the correct value with 20', async () => {
    const inputEl = screen.getByTestId(`input-${EUR_TO_COP}`);
    const buttonEl = screen.getByTestId(`button-${EUR_TO_COP}`);

    await userEvent.type(inputEl, '20');
    expect(inputEl).toHaveValue(20);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 87515.00 COP')).toBeInTheDocument();
  });

  it('Should show error when no input provided', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);
    expect(inputEl).toHaveValue(null);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('Parece que algo salio mal...')).toBeInTheDocument();
  });
});
