'use strict';

const { join } = require('path');

const Datastore = require('nedb-promise');

const validate = require('./url/validate');

const absolute = path => join(__dirname, path);

const db = new Datastore({
	autoload: true,
	filename: absolute(join('db', 'links.db'))
});

db.find({}).then(docs => Promise.all(docs.map(doc => {
	if (!validate(doc.url)) {
		console.log('Removing ' + doc._id + ': ' + doc.url);
		return db.remove({ _id: doc._id });
	}
	return Promise.resolve();
})))
	.then(() => console.log('Done!'));

