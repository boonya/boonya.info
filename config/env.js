'use strict';

require('dotenv').config();

const {
	APP_BASE_PATH,
	THEME_COLOR,
	BG_COLOR,
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
	THEME_COLOR,
	BG_COLOR,
	AUTHOR,
	NAME,
	TITLE,
	KEYWORDS,
	DESCRIPTION,
};
