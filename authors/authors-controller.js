const { httpSuccess, httpError } = require('../helpers/reponse-generator');
const { firstnameValidator } = require('../helpers/entry-validators');
const authorRepo = require('../repo/author-repo');

exports.createAuthor = async userEntry => {
	try {
		firstnameValidator(userEntry);

		const result = await authorRepo.addAuthor(userEntry);

		console.log(result);

		return httpSuccess({
			statusCode: 201,
			data: result.dataValues,
		});
	} catch (e) {
		return httpError({
			statusCode: 400,
			errorMessage: e.message,
		});
	}
};
