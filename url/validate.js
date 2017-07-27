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

module.exports = validate;
