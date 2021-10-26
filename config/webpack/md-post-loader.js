'use strict';

// 'key 1: value 1'.match(/^(?<key>[^:]+?):(?<value>[^:]+?)$/u)

module.exports = function mdLoader(source) {
	let skip = false;
	const meta = [];
	const post = [];
	source.split('\n').forEach((line) => {
		const isSeparator = (/^-{3,}$/u).test(line);
		if (isSeparator) {
			skip = !skip;
		}
		if (!isSeparator && skip) {
			meta.push(line);
		}
		else if (!isSeparator) {
			post.push(line);
		}
	});
	const metaString = meta.join('\n');
	const options = metaString.match(/^(?<key>[^:]+?):(?<value>[^:]+?)$/um);
	const postString = post.join('\n');
	const short = postString.split('<!--more-->')[0];
	console.log('match: ', {options, metaString, postString, short});
	// console.log('Result: ', JSON.stringify(postString));
	process.exit(0);

	return `export default ${JSON.stringify(filtered)}`;
};
