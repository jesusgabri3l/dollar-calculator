/// <reference types="vitest/config" />
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// El sitio se publica en https://jesusgabri3l.github.io/dollar-calculator/,
// por lo que los assets deben resolverse contra ese subdirectorio.
export default defineConfig({
  base: '/dollar-calculator/',
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/__test__/**', 'src/main.ts', 'src/vite-env.d.ts'],
    },
  },
});
