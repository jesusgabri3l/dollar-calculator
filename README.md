# Dollar Calculator

Conversor COP ⇄ USD con tasa de cambio en vivo.

**Demo:** https://jesusgabri3l.github.io/dollar-calculator/

## Stack

- Vue 3 + `<script setup>` + TypeScript
- Vite 8
- Vitest + Testing Library + MSW para tests de componente
- Tasa de cambio: [open.er-api.com](https://www.exchangerate-api.com/docs/free) (acceso abierto, sin API key)

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm test          # tests
npm run lint      # eslint
npm run build     # typecheck + build de produccion
npm run preview   # sirve el build de produccion
```

Requiere Node 22.12+ o 24+ (ver `engines` de las dependencias: Vite 8 y Vitest 5).

## Deploy

Cada push a `master` dispara `.github/workflows/deploy.yml`, que corre lint + tests,
compila y publica `dist/` en GitHub Pages. El `base` en `vite.config.ts` está fijado
a `/dollar-calculator/` porque el sitio se sirve desde ese subdirectorio.
