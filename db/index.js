'use strict';

const MINIMUM_ID_LENGTH = 1;

const { join } = require('path');

// Snippet grabbed from: https://github.com/thedevs-network/the-guard-bot/blob/e951497c7122c642037084249cf18066fec0a3de/index.js#L4-L11
{
	// NeDB on life support
	// some util methods are removed in node 23.x, monkeypatch them
	const util = require('util');
	const patch_methods = [ 'isDate', 'isRegExp' ];
	for (let i = 0; i < patch_methods.length; i++) {
		util[patch_methods[i]] = util.types[patch_methods[i]];
	}
	util.isArray = Array.isArray;
}

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
