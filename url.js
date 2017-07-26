'use strict';

const { URL } = require('url');

module.exports = url => {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
};
