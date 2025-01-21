module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/src/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
};
