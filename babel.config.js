const aliasPaths = require('./aliasPaths');

const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
  [
    'module-resolver',
    {
      alias: aliasPaths,
    },
  ],
];

module.exports = { presets, plugins };
