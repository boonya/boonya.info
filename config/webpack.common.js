'use strict';

const ENV = require('./env');
const {
	jsEntry,
	publicRoot,
	jsonManifestEntry,
	postsRoot,
	outputPath,
	postsOutputPath,
	webpackPath,
	nodeModules,
} = require('./paths');
const createArticlePages = require('./webpack/create-articles');
const createHomePage = require('./webpack/create-index');
const {createRedirectsMap, createRedirectPages} = require('./webpack/create-redirects');
const getPosts = require('./webpack/get-posts');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

function jsonManifestTransformer(content) {
	return Object
		.keys(ENV)
		.reduce((acc, name) => {
			return acc.replace(`\${${name}}`, ENV[name]);
		}, content.toString());
}

const posts = getPosts(postsRoot);
const redirects = createRedirectsMap(posts);

const globals = {
	ENV: JSON.stringify({
		themeColor: ENV.META_THEME_COLOR,
		bgColor: ENV.META_BG_COLOR,
		author: ENV.META_AUTHOR,
		name: ENV.META_NAME,
		title: ENV.META_TITLE,
		keywords: ENV.META_KEYWORDS,
		description: ENV.META_DESCRIPTION,
	}),
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
		createHomePage(posts),
		...createArticlePages(posts),
		...createRedirectPages(redirects),
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
