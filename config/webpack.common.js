'use strict';

const ENV = require('./env');
const {
	jsEntry,
	htmlEntry,
	publicRoot,
	jsonManifestEntry,
	postsRoot,
	outputPath,
	webpackPath,
	nodeModules,
} = require('./paths');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MARKDOWN = require('marked');
const path = require('path');
const webpack = require('webpack');
const YAML = require('yaml');

function jsonManifestTransformer(content) {
	return Object
		.keys(ENV)
		.reduce((acc, name) => {
			return acc.replace(`\${${name}}`, ENV[name]);
		}, content.toString());
}

function parseFilename(filename) {
	const match = filename.match(/^(?<date>\d{4}-\d{2}-\d{2})-(?<name>.+)\.md$/u);
	if (!match) { return; }
	const {name} = match.groups;
	const date = new Date(match.groups.date);
	return {filename, date, name};
}

function processRedirectFrom(value) {
	if (!value || !value.length) {
		return undefined;
	}
	if (typeof value === 'string') {
		return [value];
	}
	return value;
}

function parsePost({filename, date, name}) {
	const content = fs.readFileSync(path.join(postsRoot, filename));
	const match = content.toString().match(/^-{3,}\n(?<meta>[.\s\S]+?)(?=-{3,}\n)-{3,}\n(?<md>[.\s\S]+)/um);
	const {md} = match.groups;
	// eslint-disable-next-line camelcase
	const {permalink, title, redirect_from} = YAML.parse(match.groups.meta);
	return {
		filename,
		name,
		title,
		date,
		route: permalink,
		html: MARKDOWN(md),
		redirectFrom: processRedirectFrom(redirect_from),
	};
}

function getBlog() {
	return fs.readdirSync(postsRoot)
		.filter((filename) => (/\.md$/u).test(filename))
		.map(parseFilename)
		.filter((v) => v)
		.map(parsePost)
		.sort((a, b) => {
			if (a.date < b.date) {
				return 1;
			}
			if (a.date > b.date) {
				return -1;
			}
			return 0;
		});
}

const blog = getBlog();

function createIndex(posts) {
	const indexContent = posts.map(({title, filename, route, html}) => {
		const short = html.split(/<!--\s*more\s*-->/um)[0];
		return `
			<article id="${filename}">
				<h1><a href="${route}">${title}</a></h1>
				${short}
			</article>
		`;
	}).reduce((acc, post) => {
		return `${acc}${post}`;
	}, '');
	return `<main>${indexContent}</main>`;
}

const indexContent = createIndex(blog);

const htmlFiles = blog.map(({title, filename, route, html}) => {
	const bodyHTML = `
		<main>
			<article id="${filename}">
				<h1>${title}</h1>
				${html}
			</article>
		</main>
		<footer><a href="/">home</a></footer>
	`;
	return new HtmlWebpackPlugin({
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
		title,
		filename: route.replace(/^\//u, ''),
		bodyHTML,
	});
});

const redirects = blog
	.filter(({redirectFrom}) => redirectFrom)
	.reduce((acc, {redirectFrom, route}) => {
		const array = redirectFrom.map((from) => {
			return {from, to: route};
		});
		return [...acc, ...array];
	}, [])
	.map(({from, to}) => {
		const head = `
			<link rel="canonical" href="${to}">
			<script>location="${to}"</script>
			<meta http-equiv="refresh" content="0; url=${to}">
			<meta name="robots" content="noindex">
		`;
		const bodyHTML = `
			<h1>Redirecting</h1>
			<a href="${to}">Click here if you are not redirected.</a>
		`;
		return new HtmlWebpackPlugin({
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
			title: 'Redirecting',
			filename: from.replace(/^\//u, ''),
			head,
			bodyHTML,
		});
	});

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
		// index.html
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
			filename: 'index.html',
			title: ENV.META_TITLE,
			bodyHTML: indexContent,
		}),
		// manifest.json
		new CopyPlugin({patterns: [{
			from: jsonManifestEntry,
			to: outputPath,
			transform: jsonManifestTransformer,
		}]}),
		...htmlFiles,
		...redirects,
		new webpack.DefinePlugin({
			BLOG: JSON.stringify(blog),
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
