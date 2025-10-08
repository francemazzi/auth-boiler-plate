module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/test-integration/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/test-integration/setup.ts'],
  verbose: true,
  maxWorkers: 1,
  testTimeout: 30000,
};
