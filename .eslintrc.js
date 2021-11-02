'use strict';

module.exports = {
	root: true,
	env: {
		jest: true,
	},
	globals: {
		BLOG: 'readonly',
	},
	extends: [
		'bluedrop',
		'bluedrop/config/node',
	],
	rules: {
		'import/no-unassigned-import': ['warn'],
	},
};
