const presets = [
  'module:metro-react-native-babel-preset',
  ['@babel/preset-env', { targets: { node: 'current' } }],
];
const plugins = [
  [
    'module-resolver',
    {
      alias: {
        Components: './src/components/',
        Actions: './src/store/actions/',
        Reducers: './src/store/reducers/',
        Screens: './src/screens/',
        Utils: './src/utils/',
      },
    },
  ],
];

module.exports = { presets, plugins };
