'use strict';

const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const { compile } = require('pug');
const { Parser, HtmlRenderer } = require('commonmark');

const absolute = path => join(__dirname, path);

const markup = new HtmlRenderer().render(
	new Parser().parse(
		readFileSync(absolute('README.md'), 'utf8')));

writeFileSync(absolute('web/index.html'),
	compile(readFileSync(absolute('index.pug'), 'utf8'), {
		filters: {
			commonmark() {
				return markup;
			}
		}
	})());
