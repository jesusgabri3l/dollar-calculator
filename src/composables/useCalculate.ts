import { ref } from 'vue';

export const COP_TO_USD = 1;
export const USD_TO_COP = 2;

export type ConversionType = typeof COP_TO_USD | typeof USD_TO_COP;

const ERROR_MESSAGE = 'Parece que algo salio mal...';

// open.er-api.com es de acceso abierto: no requiere API key, por lo que nada
// sensible viaja en el bundle publicado.
const RATES_ENDPOINT = 'https://open.er-api.com/v6/latest/USD';

interface RatesResponse {
  result: string;
  rates: Record<string, number>;
}

export const useCalculate = () => {
  const error = ref<null | string>(null);
  const result = ref<string>();
  const loading = ref<boolean>(false);

  const handleClick = async (qty: string, type: ConversionType) => {
    if (!qty) {
      error.value = ERROR_MESSAGE;
      return;
    }

    loading.value = true;
    try {
      const response = await fetch(RATES_ENDPOINT);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = (await response.json()) as RatesResponse;
      const copRate = data.rates?.COP;
      if (!copRate) throw new Error('Respuesta sin tasa COP');

      error.value = null;
      result.value =
        type === COP_TO_USD
          ? (parseFloat(qty) / copRate).toFixed(2)
          : (parseFloat(qty) * copRate).toFixed(2);
    } catch {
      error.value = ERROR_MESSAGE;
    } finally {
      loading.value = false;
    }
  };

  return { error, result, loading, handleClick };
};
