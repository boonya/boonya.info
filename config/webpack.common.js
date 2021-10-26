'use strict';

const ENV = require('./env');
const {
	jsEntry,
	htmlEntry,
	publicRoot,
	outputPath,
	webpack,
	nodeModules,
} = require('./paths');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	resolveLoader: {
		modules: [webpack, nodeModules],
	},
	entry: [jsEntry],
	output: {
		path: outputPath,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
	},
	plugins: [
		new CopyPlugin({patterns: [{
			from: publicRoot,
			to: outputPath,
		}]}),
		new HtmlWebpackPlugin({
			template: htmlEntry,
			templateParameters: ENV,
		}),
	],
	module: {
		rules: [{
			test: /\.css$/u,
			use: 'css-loader',
		}, {
			test: /\.(?:js|mjs)$/u,
			exclude: /node_modules/u,
			loader: 'babel-loader',
			options: {presets: ['@babel/preset-env', '@babel/preset-react']},
		}],
	},
};
