'use strict';

const createAdder = ({
	createID,
	db,
	hash
}) => url =>
	db.findOne({ url }).then(doc =>
		doc || createID(hash(url))
			.then(_id => _id
				? db.insert({
					_id,
					created: new Date(),
					url })
				: null))
		.then(doc => doc && doc._id);

module.exports = createAdder;
