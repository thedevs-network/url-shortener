'use strict';

const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const { compile } = require('pug');
const { Parser, HtmlRenderer } = require('commonmark');

const markup = new HtmlRenderer().render(
	new Parser().parse(
		readFileSync(resolve('README.md'), 'utf8')));

writeFileSync(resolve('web/index.html'),
	compile(readFileSync('index.pug', 'utf8'), {
		filters: {
			commonmark() {
				return markup;
			}
		}
	})());
