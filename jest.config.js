module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
  coverageDirectory: '.coverage',
  testEnvironment: 'miniflare',
};
