'use strict';

const { createHash } = require('crypto');

const hash = str =>
	createHash('sha256')
		.update(str)
		.digest('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');

module.exports = hash;
