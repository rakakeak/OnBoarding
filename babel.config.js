module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@data': './src/data',
          '@assets': './src/assets',
          '@api': './src/api',
          '@query': './src/api/graphql/Query',
          '@mutation': './src/api/graphql/Mutation',
          '@theme': './src/theme',
          '@uikit': './src/uikit',
          '@screens': './src/screens',
          '@constant': './src/constant',
          '@utils': './src/utils',
          '@navigations': './src/navigations',
          '@src': './src',
        },
      },
    ],
  ],
};
