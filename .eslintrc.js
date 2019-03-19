module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'prettier', 'react-hooks', 'jsx-a11y'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
    'no-console': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
