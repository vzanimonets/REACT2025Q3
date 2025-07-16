import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm', // ESM preset!
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.cjs'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/index.{ts,tsx}',
    '!src/setupTests.{ts}',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.app.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
