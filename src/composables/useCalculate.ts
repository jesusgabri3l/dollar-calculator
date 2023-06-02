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
          'http://data.fixer.io/api/latest?access_key=6afaa6ab54bde19a95b1efe24dc1e04a&symbols=COP&format=1&_gl=1*j0kqc0*_ga*MTk4MjIyODE2MS4xNjg1NTg2NzQ0*_ga_HGV43FGGVM*MTY4NTU4Njc0NC4xLjEuMTY4NTU4Njk4Ni4zNC4wLjA.',
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
