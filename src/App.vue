<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import {
  type ConversionType,
  convert,
  COP_TO_USD,
  USD_TO_COP,
  useExchangeRate,
} from './composables/useCalculate';
import { useTheme } from './composables/useTheme';

const { rate, lastUpdated, loading, error, fetchRate } = useExchangeRate();
const { theme, toggleTheme } = useTheme();

const amount = ref('100000');
const direction = ref<ConversionType>(COP_TO_USD);

const fromCurrency = computed(() => (direction.value === COP_TO_USD ? 'COP' : 'USD'));
const toCurrency = computed(() => (direction.value === COP_TO_USD ? 'USD' : 'COP'));

const converted = computed(() => {
  const qty = parseFloat(amount.value);
  if (!rate.value || Number.isNaN(qty)) return null;
  return convert(qty, direction.value, rate.value);
});

const formattedRate = computed(() =>
  rate.value ? rate.value.toLocaleString('es-CO', { maximumFractionDigits: 2 }) : null,
);

const formattedUpdatedAt = computed(() => {
  if (!lastUpdated.value) return null;
  return new Date(lastUpdated.value).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
});

const numberFormat = (value: number) =>
  value.toLocaleString('es-CO', { maximumFractionDigits: 2 });

const swap = () => {
  const previousResult = converted.value;
  direction.value = direction.value === COP_TO_USD ? USD_TO_COP : COP_TO_USD;
  if (previousResult !== null) amount.value = previousResult.toFixed(2);
};

onMounted(fetchRate);
</script>

<template>
  <main class="page">
    <section class="card" aria-labelledby="title">
      <div class="card__header">
        <h1 id="title">Dollar Calculator</h1>
        <button
          class="theme-toggle"
          type="button"
          data-testid="theme-toggle"
          :aria-label="
            theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
          "
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>

      <p class="rate" data-testid="rate-info">
        <template v-if="loading && !rate">Cargando tasa de cambio...</template>
        <template v-else-if="formattedRate">
          1 USD = {{ formattedRate }} COP
          <span class="rate__updated">actualizado {{ formattedUpdatedAt }}</span>
        </template>
      </p>

      <div class="field">
        <label for="amount">{{ fromCurrency }}</label>
        <input
          id="amount"
          v-model="amount"
          data-testid="amount-input"
          type="number"
          min="0"
          inputmode="decimal"
          placeholder="0"
        />
      </div>

      <button
        class="swap"
        type="button"
        data-testid="swap-button"
        :disabled="loading"
        :aria-label="`Cambiar direccion, actualmente de ${fromCurrency} a ${toCurrency}`"
        @click="swap"
      >
        ⇅
      </button>

      <div class="field field--result">
        <label for="result">{{ toCurrency }}</label>
        <output id="result" data-testid="result">
          {{ converted !== null ? numberFormat(converted) : '—' }}
        </output>
      </div>

      <p v-if="error" class="error" data-testid="error">{{ error }}</p>
    </section>
  </main>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.card {
  width: 100%;
  max-width: 24rem;
  padding: 2rem;
  border-radius: 1rem;
  background: var(--surface);
  box-shadow: 0 1px 3px var(--shadow);
  border: 1px solid var(--border);
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0 0 0.25rem;
}

h1 {
  margin: 0;
  font-size: 1.375rem;
}

.theme-toggle {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 1.125rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: var(--input-bg);
  }
}

.rate {
  min-height: 1.25rem;
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.rate__updated {
  display: block;
  font-size: 0.75rem;
  opacity: 0.75;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: var(--text-muted);
  }

  input,
  output {
    padding: 0.75rem 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background: var(--input-bg);
    font-size: 1.25rem;
    color: var(--text);
  }

  input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }
}

.field--result output {
  border-style: dashed;
  color: var(--text-muted);
}

.swap {
  display: block;
  margin: 0.75rem auto;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--accent);
  font-size: 1.125rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--input-bg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.error {
  margin: 1rem 0 0;
  font-size: 0.875rem;
  color: var(--danger);
}
</style>
