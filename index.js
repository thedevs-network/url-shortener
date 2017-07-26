'use strict';

const { statSync, readdirSync } = require('fs');
const { join } = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { validate, parse } = require('./url');
const { find, add } = require('./db');

const app = express();

app.use(bodyParser.text({ type: '*/*' }));

app.get('/', (req, res) =>
	res.sendFile(join(__dirname, 'README.md')));

app.get('/:id', (req, res) =>
	find(req.params.id).then(url => url
		? res.redirect(url)
		: res.sendStatus(404)));

app.post('/', (req, res) => (url =>
	validate(url)
		? add(parse(url)).then(id => id
			? res.send(id)
			: res.status(500).send('Server Error'))
		: res.status(400).send('Invalid URL'))(String(req.body)));

app.listen(4000, '127.0.0.1');
