'use strict';

const ENV = require('../env');
const {templatesRoot} = require('../paths');
const createRoot = require('./create-root');
const processTemplate = require('./process-template');
const fs = require('fs');
const path = require('path');

function createArticle(id, title, date, body) {
	const template = fs.readFileSync(path.resolve(templatesRoot, 'full-article.html')).toString();
	return processTemplate(template, {
		id,
		title,
		datetime: date.toISOString(),
		date: new Intl.DateTimeFormat('ru-UA').format(date),
		body,
	});
}

function createBody(id, title, date, html) {
	const postTpl = fs.readFileSync(path.resolve(templatesRoot, 'post.html')).toString();

	const body = createArticle(id, title, date, html);

	return processTemplate(postTpl, {
		name: ENV.META_NAME,
		title: ENV.META_TITLE,
		appBasePath: ENV.APP_BASE_PATH,
		body,
	});
}

module.exports = function (posts) {
	return posts.map(({route, filename, title, date, html}) => {
		const body = createBody(filename, title, date, html);
		return createRoot({
			filename: route,
			title,
			body,
		});
	});
};
