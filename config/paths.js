'use strict';

const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const config = path.resolve(__dirname);
const webpack = path.resolve(__dirname, 'webpack');
const appSrc = path.resolve(appRoot, 'src');
const publicRoot = path.resolve(appRoot, 'public');

module.exports = {
	appRoot,
	config,
	webpack,
	appSrc,
	publicRoot,
	jsEntry: path.join(appSrc, 'index.js'),
	htmlEntry: path.resolve(appSrc, 'index.html'),
	webManifestEntry: path.resolve(appSrc, 'site.webmanifest'),
	jsonManifestEntry: path.resolve(appSrc, 'manifest.json'),
	nodeModules: path.resolve(appRoot, 'node_modules'),
	outputPath: path.resolve(appRoot, 'build'),
};
