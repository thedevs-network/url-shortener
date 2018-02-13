'use strict';

const { URL } = require('url');

const banned = [
	'sereyoudom.com.kh'
];

const validate = urlString => {
	try {
		const url = new URL(urlString);
		if (banned.find(domain => domain.endsWith(url.hostname)))
			return false;
		return true;
	} catch (err) {
		return false;
	}
};

module.exports = validate;
