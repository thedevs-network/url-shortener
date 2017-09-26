'use strict';

const MINIMUM_ID_LENGTH = 1;

const { join } = require('path');

const Datastore = require('nedb-promise');

const createAdder = require('./add');
const createFinder = require('./find');
const createIDGenerator = require('./id');
const hash = require('./hash');

const absolute = path => join(__dirname, path);

const db = new Datastore({
	autoload: true,
	filename: absolute('links.db')
});

db.ensureIndex({
	fieldName: 'url',
	unique: true
});

module.exports = Object.freeze({
	add: createAdder({
		createID: createIDGenerator({
			db,
			hash,
			logger: console,
			minLength: MINIMUM_ID_LENGTH
		}),
		db,
		hash
	}),
	find: createFinder({ db })
});
