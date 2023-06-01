import { defineStore } from 'pinia';
import type { ComputedRef, Ref } from 'vue';
import { computed, ref } from 'vue';

export interface storeType {
  count: Ref<number>;
  doubleCount: ComputedRef<number>;
  increment: () => number;
}
export const useCounterStore = defineStore('counter', (): storeType => {
  // State
  const count = ref<number>(0);
  //Getters
  const doubleCount = computed((): number => count.value * 2);
  // Actions
  const increment = (): number => count.value++;

  return { count, doubleCount, increment };
});
