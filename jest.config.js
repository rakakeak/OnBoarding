import 'jest-styled-components';
module.exports = {
  // ...
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
  ],
  // ...
};
