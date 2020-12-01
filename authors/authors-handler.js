const authorRepo = require('../repo/author-repo');

exports.createAuthor = async ({ firstname, lastname }) => {
	try {
		return await authorRepo.add({ firstname, lastname });
	} catch (e) {
		return e;
	}
};
