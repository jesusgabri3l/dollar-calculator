import axios from 'axios';
import { ref } from 'vue';
export const COP_TO_EUR = 1;
export const EUR_TO_COP = 2;
const ERROR_MESSAGE = 'Parece que algo salio mal...';

export const useCalculate = () => {
  const error = ref<null | string>(null);
  const result = ref<string>();
  const loading = ref<boolean>(false);

  const handleClick = async (qty: string, type: Number) => {
    if (!qty) error.value = ERROR_MESSAGE;
    else {
      try {
        loading.value = true;
        const { data: response } = await axios(
          'https://api.apilayer.com/fixer/latest?base=USD&symbols=COP',
          {
            headers: {
              apiKey: 'LFMEc6auoxGx43glex1lpPA1OzNh3SmO',
            },
          },
        );
        loading.value = false;
        error.value = null;
        if (type === COP_TO_EUR)
          result.value = (parseFloat(qty) / response.rates.COP).toFixed(2);
        if (type === EUR_TO_COP)
          result.value = (parseFloat(qty) * response.rates.COP).toFixed(2);
      } catch (e) {
        loading.value = false;
        error.value = ERROR_MESSAGE;
      }
    }
  };
  return { error, result, loading, handleClick };
};
