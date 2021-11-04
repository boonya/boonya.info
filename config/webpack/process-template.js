'use strict';

const PATTERN = /<%=\s*(?<var>[\w.]+)\s*%>/ug;

function process(value, props) {
	const key = value.trim();
	return props[key];
}

module.exports = function (template, props) {
	return template.replace(PATTERN, (_, key) => process(key, props));
};
