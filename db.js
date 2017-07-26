'use strict';

const { createHash } = require('crypto');
const Datastore = require('nedb-promise');

const MINIMUM_ID_LENGTH = 1;

const hash = str =>
	createHash('sha256')
		.update(str)
		.digest('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');

const createIDGenerator = db =>
	function generate(str, len = MINIMUM_ID_LENGTH) {
		const _id = str.substr(0, len);
		return len > str.length
			? (console.log('hash collision at', str, 'rehashing...'),
				generate(hash(str)))
			: db.findOne({ _id }).then(doc => doc
				? generate(str, len + 1)
				: _id);
	};

const createFinder = db => _id =>
	db.findOne({ _id })
		.then(doc => doc && doc.url);

const createAdder = (db, generateID) => url =>
	db.findOne({ url }).then(doc => doc
		? doc._id
		: generateID(hash(url))
			.then(_id => _id
				? db.insert({
					_id,
					created: Date.now(),
					url
				})
				: null))
		.then(doc => doc && doc._id);


const links = new Datastore({
	autoload: true,
	filename: 'links.db'
});

links.ensureIndex({
	fieldName: 'url',
	unique: true
});

module.exports = {
	add: createAdder(links, createIDGenerator(links)),
	find: createFinder(links)
};
