'use strict';

const { URL } = require('url');

const parse = url =>
	new URL(url).href;

module.exports = parse;
