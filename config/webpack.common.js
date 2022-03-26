'use strict';

const ENV = require('./env');
const {
	jsEntry,
	publicRoot,
	jsonManifestEntry,
	htmlEntry,
	postsRoot,
	outputPath,
	postsOutputPath,
	webpackPath,
	nodeModules,
} = require('./paths');
const createPosts = require('./webpack/create-posts');
const createRedirectsMap = require('./webpack/create-redirects');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function jsonManifestTransformer(content) {
	return Object
		.keys(ENV)
		.reduce((acc, name) => {
			return acc.replace(`\${${name}}`, ENV[name]);
		}, content.toString());
}

const posts = createPosts(postsRoot);
const redirects = createRedirectsMap(posts);

const globals = {
	ENV: JSON.stringify(ENV),
	POSTS: JSON.stringify(posts.map(({route, filename, name, date}) => ({route, filename, name, date}))),
	REDIRECTS: JSON.stringify(redirects),
};

module.exports = {
	resolveLoader: {
		modules: [webpackPath, nodeModules],
	},
	entry: [jsEntry],
	output: {
		path: outputPath,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		clean: true,
	},
	plugins: [
		// public directory
		new CopyPlugin({patterns: [{
			from: publicRoot,
			to: outputPath,
		}]}),
		// manifest.json
		new CopyPlugin({patterns: [{
			from: jsonManifestEntry,
			to: outputPath,
			transform: jsonManifestTransformer,
		}]}),
		// Copy posts markdown files
		new CopyPlugin({patterns: [{
			from: postsRoot,
			to: postsOutputPath,
		}]}),
		new webpack.DefinePlugin(globals),
		// index.html
		new HtmlWebpackPlugin({
			template: htmlEntry,
			templateParameters: ENV,
			publicPath: ENV.APP_BASE_PATH,
			meta: {
				keywords: ENV.KEYWORDS,
				description: ENV.DESCRIPTION,
				author: ENV.AUTHOR,
			},
			xhtml: true,
			filename: 'index.html',
			title: ENV.TITLE,
			base: ENV.APP_BASE_PATH,
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
