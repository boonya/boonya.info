'use strict';

module.exports = function (posts) {
	return posts
		.filter(({redirectFrom}) => redirectFrom)
		.reduce((acc, {redirectFrom, route}) => {
			const array = redirectFrom.map((from) => [from, route]);
			return [...acc, ...array];
		}, []);
};
