'use strict';

const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const { compile } = require('pug');
const { Parser, HtmlRenderer } = require('commonmark');

const abs = path => join(__dirname, path);

const markup = new HtmlRenderer().render(
	new Parser().parse(
		readFileSync(abs('README.md'), 'utf8')));

writeFileSync(abs('web/index.html'),
	compile(readFileSync(abs('index.pug'), 'utf8'), {
		filters: {
			commonmark() {
				return markup;
			}
		}
	})());
