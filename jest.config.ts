import type { Config } from '@jest/types';

export default (): Config.InitialOptions => ({
  preset: 'ts-jest',
  collectCoverage: true,
});
