'use strict';

const ENV = require('./env');
const {
	jsEntry,
	htmlEntry,
	publicRoot,
	webManifestEntry,
	jsonManifestEntry,
	outputPath,
	webpack,
	nodeModules,
} = require('./paths');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function copyFileTransformer(content) {
	return Object
		.keys(ENV)
		.reduce((acc, name) => {
			return acc.replace(`\${${name}}`, ENV[name]);
		}, content.toString());
}

module.exports = {
	resolveLoader: {
		modules: [webpack, nodeModules],
	},
	entry: [jsEntry],
	output: {
		path: outputPath,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		clean: true,
	},
	plugins: [
		new CopyPlugin({patterns: [{
			from: publicRoot,
			to: outputPath,
		}]}),
		new HtmlWebpackPlugin({
			template: htmlEntry,
			templateParameters: ENV,
			publicPath: ENV.APP_BASE_PATH,
			meta: {
				'theme-color': ENV.META_THEME_COLOR,
				keywords: ENV.META_KEYWORDS,
				description: ENV.META_DESCRIPTION,
				author: ENV.META_AUTHOR,
			},
			xhtml: true,
		}),
		new CopyPlugin({patterns: [{
			from: webManifestEntry,
			to: outputPath,
			transform: copyFileTransformer,
		}]}),
		new CopyPlugin({patterns: [{
			from: jsonManifestEntry,
			to: outputPath,
			transform: copyFileTransformer,
		}]}),
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
