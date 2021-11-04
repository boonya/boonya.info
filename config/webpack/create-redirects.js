'use strict';

const {templatesRoot} = require('../paths');
const createRoot = require('./create-root');
const path = require('path');

function createRedirectsMap(posts) {
	return posts
		.filter(({redirectFrom}) => redirectFrom)
		.reduce((acc, {redirectFrom, route}) => {
			const array = redirectFrom.map((from) => [from, route]);
			return [...acc, ...array];
		}, []);
}

function createRedirectPages(redirects) {
	return redirects.map(([from, to]) => {
		return createRoot({
			template: path.resolve(templatesRoot, 'redirect.html'),
			filename: from,
			inject: false,
			title: 'Redirecting',
			to,
		});
	});
}

module.exports = {
	createRedirectsMap,
	createRedirectPages,
};
