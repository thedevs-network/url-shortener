'use strict';

const { URL } = require('url');

const banned = [
	'freebitco.in',
	'freedoge.co.in',
	'sereyoudom.com.kh',
	'trkxc.com',
	'uetrk.com'
];

const validate = urlString => {
	try {
		const url = new URL(urlString);
		if (banned.find(domain => url.hostname.endsWith(domain)))
			return false;
		return true;
	} catch (err) {
		return false;
	}
};

module.exports = validate;
