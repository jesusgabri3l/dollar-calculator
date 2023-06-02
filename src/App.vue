<script setup lang="ts">
import { ref } from 'vue';

import { COP_TO_EUR, EUR_TO_COP, useCalculate } from './composables/useCalculate';

const qty = ref('');
const qty2 = ref('');
const { error, result, loading, handleClick } = useCalculate();
const {
  error: error2,
  result: result2,
  loading: loading2,
  handleClick: handleClick2,
} = useCalculate();
</script>

<template>
  <div>
    <input
      v-model="qty"
      placeholder="Pesos"
      type="number"
      min="1"
      :data-testid="`input-${COP_TO_EUR}`"
    />
    <button :data-testid="`button-${COP_TO_EUR}`" @click="handleClick(qty, COP_TO_EUR)">
      Calcular
    </button>
    <p v-if="loading">Cargando...</p>
    <strong v-if="result && !error && !loading">
      El resultado es : {{ result }} EUR
    </strong>
    <p v-if="error">{{ error }}</p>
  </div>
  <div>
    <input
      v-model="qty2"
      placeholder="Euros"
      type="number"
      min="1"
      :data-testid="`input-${EUR_TO_COP}`"
    />
    <button :data-testid="`button-${EUR_TO_COP}`" @click="handleClick2(qty2, EUR_TO_COP)">
      Calcular
    </button>
    <p v-if="loading2">Cargando...</p>
    <strong v-if="result2"> El resultado es : {{ result2 }} COP </strong>
    <p v-if="error2">{{ error2 }}</p>
  </div>
</template>
