'use strict';

const { readFileSync, writeFileSync } = require('fs');

const { compile } = require('pug');
const { Parser, HtmlRenderer } = require('commonmark');

const parser = new Parser();
const renderer = new HtmlRenderer();

const ast = parser.parse(readFileSync('README.md', 'utf8'));
const markup = renderer.render(ast);

writeFileSync('web/index.html', compile(readFileSync('web/index.pug', 'utf8'), {
	filters: {
		commonmark () {
			return markup;
		}
	}
})());
