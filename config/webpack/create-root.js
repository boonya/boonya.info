'use strict';

const ENV = require('../env');
const {templatesRoot} = require('../paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function (options) {
	const {filename, meta, ...props} = options;
	return new HtmlWebpackPlugin({
		template: path.resolve(templatesRoot, 'root.html'),
		templateParameters: ENV,
		publicPath: ENV.APP_BASE_PATH,
		meta: {
			'theme-color': ENV.META_THEME_COLOR,
			keywords: ENV.META_KEYWORDS,
			description: ENV.META_DESCRIPTION,
			author: ENV.META_AUTHOR,
			...meta,
		},
		xhtml: true,
		filename: filename.replace(/^\//u, ''),
		...props,
	});
};
