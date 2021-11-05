'use strict';

const parsePost = require('./parse-post');
const fs = require('fs');
const path = require('path');

function parseFilename(filename) {
	const match = filename.match(/^(?<date>\d{4}-\d{2}-\d{2})-(?<name>.+)\.md$/u);
	if (!match) {
		return null;
	}
	const {name} = match.groups;
	const date = new Date(match.groups.date);
	return {filename, date, name};
}

function processFile(directory, {filename, date, name}) {
	const content = fs.readFileSync(path.join(directory, filename));
	const post = parsePost(content);
	return {
		filename,
		name,
		date,
		...post,
	};
}

function sort(a, b) {
	if (a.date < b.date) {
		return 1;
	}
	if (a.date > b.date) {
		return -1;
	}
	return 0;
}

module.exports = function (directory) {
	return fs.readdirSync(directory)
		.map(parseFilename)
		.filter((v) => v)
		.map((data) => processFile(directory, data))
		.sort(sort);
};
