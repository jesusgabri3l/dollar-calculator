module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'linebreak-style': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'max-len': ['warn', { code: 160, ignoreComments: true }],
    semi: ['error', 'always'],
  },
};
