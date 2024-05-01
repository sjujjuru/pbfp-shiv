// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
