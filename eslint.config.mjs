// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default tseslint.config([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    ignores: ['**/*.js', '**/*.mjs']
  },
  {
    rules: {
      // General rules
      semi: ['error', 'always'],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true
        }
      ],
      'jsx-quotes': ['error', 'prefer-single'],
      'linebreak-style': ['error', 'unix'],
      'no-console': 'warn',
      'comma-dangle': ['error', 'never'],
      'no-unused-expressions': 'error',
      'no-constant-binary-expression': 'error',

      // Import plugin rules
      'import/order': [
        'warn',
        {
          pathGroups: [
            {
              pattern: '*.scss',
              group: 'builtin',
              position: 'before',

              patternOptions: {
                matchBase: true
              }
            },
            {
              pattern: '@lib/**',
              group: 'external',
              position: 'after'
            },
            {
              pattern: '@components/**',
              group: 'external',
              position: 'after'
            }
          ],
          warnOnUnassignedImports: true,
          pathGroupsExcludedImportTypes: ['type'],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ]
        }
      ],

      // TypeScript specific rules
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ]
    }
  }
]);
