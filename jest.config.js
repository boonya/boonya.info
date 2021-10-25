'use strict';
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	globals: {
		NODE_ENV: 'test',
	},
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
	testRunner: '<rootDir>/node_modules/jest-circus/runner.js',
	setupFiles: [
		'react-app-polyfill/jsdom',
	],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
	],
	transform: {
		'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/test/babelTransform.js',
		'^.+\\.css$': '<rootDir>/test/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/test/fileTransform.js',
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	modulePaths: [],
	moduleNameMapper: {
		'^react-native$': 'react-native-web',
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
		'.(?:gif|png|jpe?g|svg)$': '<rootDir>/test/stubs/staticFile.js',
	},
	moduleFileExtensions: [
		'web.js',
		'js',
		'web.ts',
		'ts',
		'web.tsx',
		'tsx',
		'json',
		'web.jsx',
		'jsx',
		'node',
	],
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
	moduleDirectories: [
		'node_modules',
		'src',
	],
	resetMocks: true,
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	coverageDirectory: './coverage',
	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: ['text-summary', 'html'],
	coveragePathIgnorePatterns: ['test'],
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
	],
};
