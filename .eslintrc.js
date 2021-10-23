'use strict';

module.exports = {
	root: true,
	env: {
		jest: true,
	},
	extends: [
		'bluedrop',
		'bluedrop/config/node',
	],
	rules: {
		'import/no-unassigned-import': ['warn'],
	},
};
