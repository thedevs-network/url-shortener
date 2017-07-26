'use strict';

const { parse } = require('url');
const { request } = require('https');

const merge = (...objects) =>
	Object.assign({}, ...objects);

request(merge(parse('https://url.thedevs.network'), {
	headers: {
		'Content-Type': 'text/plain'
	},
	method: 'POST'
}), res => {
	process.stdout.write('https://url.thedevs.network/');
	res.pipe(process.stdout);
	res.once('end', () => process.stdout.write('\n'));
}).end(process.argv[2]);
