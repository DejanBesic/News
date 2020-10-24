const aliasPaths = require('./aliasPaths');

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
  plugins: ['react', 'import', 'eslint-plugin-prettier', 'eslint-plugin-react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [0],
    'react/destructuring-assignment': [0],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        semi: true,
        jsxBracketSameLine: true,
        endOfLine: 'auto',
      },
    ],
  },
  env: {
    jest: true,
    es6: true,
  },
};
