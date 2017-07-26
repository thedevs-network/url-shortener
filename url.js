'use strict';

const { URL } = require('url');

const validate = url => {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
};

const parse = url =>
	new URL(url).href;

module.exports = {
	parse,
	validate
};
