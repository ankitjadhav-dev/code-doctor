import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export const baseConfig = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  { settings: { react: { version: 'detect' } }, rules: { 'import/no-unresolved': 'off' } },
];
