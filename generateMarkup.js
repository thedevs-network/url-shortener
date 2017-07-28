'use strict';

const { readFileSync, writeFileSync } = require('fs');

const { compile } = require('pug');
const { Parser, HtmlRenderer } = require('commonmark');

const markup = new HtmlRenderer().render(
	new Parser().parse(
		readFileSync('README.md', 'utf8')));

writeFileSync('web/index.html', compile(readFileSync('web/index.pug', 'utf8'), {
	filters: {
		commonmark () {
			return markup;
		}
	}
})());
