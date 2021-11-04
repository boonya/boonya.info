'use strict';

const ENV = require('../env');
const {templatesRoot} = require('../paths');
const createRoot = require('./create-root');
const processTemplate = require('./process-template');
const fs = require('fs');
const path = require('path');

function createArticle(template, {title, filename, route, date, html}) {
	const body = html.split(/<!--\s*more\s*-->/um)[0];

	return processTemplate(template, {
		id: filename,
		title,
		route,
		datetime: date.toISOString(),
		date: new Intl.DateTimeFormat('ru-UA').format(date),
		body,
	});
}

function createBody(posts) {
	const homeTpl = fs.readFileSync(path.resolve(templatesRoot, 'home.html')).toString();
	const articleTpl = fs.readFileSync(path.resolve(templatesRoot, 'short-article.html')).toString();

	const body = posts
		.map((props) => createArticle(articleTpl, props))
		.join('\n');

	return processTemplate(homeTpl, {
		name: ENV.META_NAME,
		title: ENV.META_TITLE,
		body,
	});
}

module.exports = function (posts) {
	return createRoot({
		filename: 'index.html',
		title: ENV.META_TITLE,
		body: createBody(posts),
	});
};
