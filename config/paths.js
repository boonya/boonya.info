'use strict';

const path = require('path');

const configRoot = path.resolve(__dirname);
const appRoot = path.resolve(configRoot, '..');
const postsRoot = path.resolve(appRoot, '_posts');
const webpackPath = path.resolve(__dirname, 'webpack');
const appSrc = path.resolve(appRoot, 'src');
const publicRoot = path.resolve(appRoot, 'public');

module.exports = {
	appRoot,
	configRoot,
	webpackPath,
	appSrc,
	postsRoot,
	publicRoot,
	jsEntry: path.join(appSrc, 'index.js'),
	htmlEntry: path.resolve(appSrc, 'index.html'),
	jsonManifestEntry: path.resolve(appSrc, 'manifest.json'),
	nodeModules: path.resolve(appRoot, 'node_modules'),
	outputPath: path.resolve(appRoot, 'build'),
};
