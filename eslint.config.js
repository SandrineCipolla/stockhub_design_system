import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'storybook-static/'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      camelcase: ['error', { properties: 'never' }],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      // TypeScript verifie deja les references non definies (types DOM
      // globaux comme EventListener declenchent des faux positifs ici).
      'no-undef': 'off',
    },
  },
  {
    files: ['src/tokens/generate-css.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...storybook.configs['flat/recommended'],
];
