import type {Config} from '@jest/types';
import * as path from 'path';

// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	testRegex: '.e2e-spec.ts$',
	testEnvironment: 'node',
	rootDir: path.resolve(__dirname, '../'),
	moduleNameMapper: {
		'^@internal/(.*)$': `<rootDir>/$1`,
	},

	moduleFileExtensions: [
		'js', 'json', 'ts',
	],

	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
};

export default config;
