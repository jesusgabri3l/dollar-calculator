<script setup lang="ts">
import { useCounterStore } from '../store/useCounterStore';
// Props definitions
interface Props {
  msg?: string;
}
withDefaults(defineProps<Props>(), {
  msg: 'Hello!',
});
// Variables / States
const counterStore = useCounterStore();
// Methods
const countHandler = (e: MouseEvent): MouseEvent => {
  counterStore.increment();
  return e;
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countHandler">count is {{ counterStore.count }}</button>
    <p>Double is : {{ counterStore.doubleCount }}</p>
  </div>
</template>
