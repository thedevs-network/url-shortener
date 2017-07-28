'use strict';

const createFinder = ({ db }) => _id =>
	db.findOne({ _id })
		.then(doc => doc && doc.url);

module.exports = createFinder;
