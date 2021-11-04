'use strict';

const YAML = require('yaml');

function processRedirectFrom(value) {
	if (!value || !value.length) {
		return undefined;
	}
	if (typeof value === 'string') {
		return [value];
	}
	return value;
}

module.exports = function (content) {
	const match = content.toString().match(/^-{3,}\n(?<meta>[.\s\S]+?)(?=-{3,}\n)-{3,}\n(?<md>[.\s\S]+)/um);
	// eslint-disable-next-line camelcase
	const {permalink, title, redirect_from} = YAML.parse(match.groups.meta);
	return {
		title,
		route: permalink,
		redirectFrom: processRedirectFrom(redirect_from),
	};
};
