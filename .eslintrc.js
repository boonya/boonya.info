'use strict';

module.exports = {
	root: true,
	env: {
		jest: true,
	},
	globals: {
		ENV: 'readonly',
		POSTS: 'readonly',
		REDIRECTS: 'readonly',
	},
	extends: [
		'bluedrop',
		'bluedrop/config/node',
	],
	rules: {
		'import/no-unassigned-import': ['warn'],
	},
};
