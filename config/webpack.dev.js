'use strict';

const {DEV_SERVER_PORT} = require('./env');
const {outputPath} = require('./paths');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: outputPath,
		compress: true,
		port: DEV_SERVER_PORT,
		historyApiFallback: {
			rewrites: [
				{from: /./u, to: '/index.html'},
			],
		},
		liveReload: true,
	},
});
