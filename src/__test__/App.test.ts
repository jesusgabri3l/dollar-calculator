import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '../App.vue';
import { COP_TO_EUR, EUR_TO_COP } from '../composables/useCalculate';

beforeEach(() => {
  render(App);
});
describe('COP TO EUR Tests', () => {
  it('Should render COP TO EUR components', () => {
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
    expect(await screen.findByText('El resultado es : 2.10 EUR')).toBeInTheDocument();
  });

  it('Should get the correct value with 25000', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);

    await userEvent.type(inputEl, '25000');
    expect(inputEl).toHaveValue(25000);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 5.26 EUR')).toBeInTheDocument();
  });

  it('Should show error when no input provided', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);
    expect(inputEl).toHaveValue(null);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('Parece que algo salio mal...')).toBeInTheDocument();
  });
});

describe('EUR TO COP Tests', () => {
  it('Should render EURO TO COP components', () => {
    const inputEl = screen.getByTestId(`input-${EUR_TO_COP}`);
    const buttonEl = screen.getByTestId(`button-${EUR_TO_COP}`);

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('placeholder', 'Euros');
    expect(inputEl).toHaveAttribute('type', 'number');

    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent('Calcular');
  });

  it('Should get the correct value with 3 euros', async () => {
    const inputEl = screen.getByTestId(`input-${EUR_TO_COP}`);
    const buttonEl = screen.getByTestId(`button-${EUR_TO_COP}`);

    await userEvent.type(inputEl, '3');
    expect(inputEl).toHaveValue(3);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 14270.80 COP')).toBeInTheDocument();
  });

  it('Should get the correct value with 20', async () => {
    const inputEl = screen.getByTestId(`input-${EUR_TO_COP}`);
    const buttonEl = screen.getByTestId(`button-${EUR_TO_COP}`);

    await userEvent.type(inputEl, '20');
    expect(inputEl).toHaveValue(20);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('El resultado es : 95138.64 COP')).toBeInTheDocument();
  });

  it('Should show error when no input provided', async () => {
    const inputEl = screen.getByTestId(`input-${COP_TO_EUR}`);
    const buttonEl = screen.getByTestId(`button-${COP_TO_EUR}`);
    expect(inputEl).toHaveValue(null);
    await userEvent.click(buttonEl);
    expect(await screen.findByText('Parece que algo salio mal...')).toBeInTheDocument();
  });
});
