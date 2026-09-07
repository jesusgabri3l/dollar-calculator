import { onMounted, ref, watch } from 'vue';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
};

const DEFAULT_THEME: Theme = 'dark';

export const useTheme = () => {
  const theme = ref<Theme>(readStoredTheme() ?? DEFAULT_THEME);

  const applyTheme = (value: Theme) => {
    document.documentElement.setAttribute('data-theme', value);
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  watch(
    theme,
    (value) => {
      applyTheme(value);
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // localStorage puede fallar en modo privado; el toggle sigue
        // funcionando para la sesion actual, solo no persiste.
      }
    },
    { immediate: true },
  );

  onMounted(() => applyTheme(theme.value));

  return { theme, toggleTheme };
};
