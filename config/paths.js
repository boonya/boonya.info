'use strict';

const path = require('path');

const configRoot = path.resolve(__dirname);
const templatesRoot = path.resolve(configRoot, 'templates');
const appRoot = path.resolve(configRoot, '..');
const postsRoot = path.resolve(appRoot, '_posts');
const webpackPath = path.resolve(__dirname, 'webpack');
const appSrc = path.resolve(appRoot, 'src');
const publicRoot = path.resolve(appRoot, 'public');
const outputPath = path.resolve(appRoot, 'build');

module.exports = {
	appRoot,
	configRoot,
	templatesRoot,
	webpackPath,
	appSrc,
	postsRoot,
	publicRoot,
	jsEntry: path.join(appSrc, 'index.js'),
	htmlEntry: path.resolve(appSrc, 'index.html'),
	jsonManifestEntry: path.resolve(appSrc, 'manifest.json'),
	nodeModules: path.resolve(appRoot, 'node_modules'),
	outputPath,
	postsOutputPath: path.resolve(outputPath, '_posts'),
};
