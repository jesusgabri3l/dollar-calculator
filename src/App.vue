<script setup lang="ts">
import { ref } from 'vue';

import HelloWorld from './components/HelloWorld.vue';

const text = ref('Vue3 + TS + Pinia + ESLint + Prettier + Vitest + @testing-library');
</script>

<template>
  <h1>{{ text }}</h1>
  <HelloWorld msg="Ready to build and test!" />
</template>
