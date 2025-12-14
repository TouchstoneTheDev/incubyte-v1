module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/server.ts',
    '!src/config/**'
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 40,
      lines: 15,
      statements: 15
    }
  },
  setupFiles: ['<rootDir>/src/tests/setup.ts']
};
