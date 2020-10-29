module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: { fetch: false },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          Components: './src/components/',
          Actions: './src/store/actions/',
          Reducers: './src/store/reducers/',
          Screens: './src/screens/',
          Utils: './src/utils/',
        },
      },
      node: {
        extensions: ['.js', '.jsx', '.json', '.native.js'],
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
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-props-no-spreading': 'off',
    'import/no-named-as-default': 0,
    'react/destructuring-assignment': [0],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
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
