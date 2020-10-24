const aliasPaths = require('./aliasPaths');
require('babel-register');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: aliasPaths,
      },
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'import',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [0],
    'react/destructuring-assignment': [0],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
        semi: true,
        endOfLine: 'auto',
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
  env: {
    jest: true,
    es6: true,
  },
};
