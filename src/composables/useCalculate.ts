import { ref } from 'vue';

export const COP_TO_USD = 1;
export const USD_TO_COP = 2;

export type ConversionType = typeof COP_TO_USD | typeof USD_TO_COP;

const ERROR_MESSAGE = 'Parece que algo salio mal...';

// open.er-api.com es de acceso abierto: no requiere API key, por lo que nada
// sensible viaja en el bundle publicado (necesario porque el sitio se sirve
// desde GitHub Pages, sin backend que pueda ocultar un secreto).
const RATES_ENDPOINT = 'https://open.er-api.com/v6/latest/USD';

interface RatesResponse {
  result: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}

export const convert = (qty: number, type: ConversionType, copPerUsd: number): number =>
  type === COP_TO_USD ? qty / copPerUsd : qty * copPerUsd;

export const useExchangeRate = () => {
  const rate = ref<number>();
  const lastUpdated = ref<string>();
  const loading = ref(false);
  const error = ref<null | string>(null);

  const fetchRate = async () => {
    loading.value = true;
    try {
      const response = await fetch(RATES_ENDPOINT);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = (await response.json()) as RatesResponse;
      const copRate = data.rates?.COP;
      if (!copRate) throw new Error('Respuesta sin tasa COP');

      rate.value = copRate;
      lastUpdated.value = data.time_last_update_utc;
      error.value = null;
    } catch {
      error.value = ERROR_MESSAGE;
    } finally {
      loading.value = false;
    }
  };

  return { rate, lastUpdated, loading, error, fetchRate };
};
