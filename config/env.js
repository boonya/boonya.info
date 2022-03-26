'use strict';

require('dotenv').config();

const {
	APP_BASE_PATH,
	AUTHOR,
	NAME,
	TITLE,
	KEYWORDS,
	DESCRIPTION,
} = process.env;

const value = (APP_BASE_PATH || '').replace(/^\/?(?<path>.*?)\/?$/u, '$1');
const basePath = value ? `/${value}/` : '/';

module.exports = {
	APP_BASE_PATH: basePath,
	AUTHOR,
	NAME,
	TITLE,
	KEYWORDS,
	DESCRIPTION,
};
