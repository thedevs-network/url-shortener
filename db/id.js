'use strict';

const createID = ({
	db,
	hash,
	logger,
	minLength
}) =>
	function generate(str, len = minLength) {
		const _id = str.substr(0, len);
		return len > str.length
			? (logger.log('hash collision at', str, 'rehashing...'),
				generate(hash(str)))
			: db.findOne({ _id }).then(doc => doc
				? generate(str, len + 1)
				: _id);
	};

module.exports = createID;
