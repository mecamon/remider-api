const Authors = require('../models/author');

const authorRepo = Object.freeze({
	add: async authorData => await Authors.create(authorData),
});

module.exports = authorRepo;
