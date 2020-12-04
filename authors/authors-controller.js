const { httpSuccess, httpError } = require('../helpers/reponse-generator');
const {
	firstnameValidator,
	reminderValidator,
	delAuthorValidator,
} = require('../helpers/entry-validators');
const authorRepo = require('../repo/author-repo');

exports.createAuthor = async userEntry => {
	try {
		firstnameValidator(userEntry);

		const result = await authorRepo.addAuthor(userEntry);

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

exports.createReminder = async userEntry => {
	try {
		reminderValidator(userEntry);

		const result = await authorRepo.addReminder(userEntry);
		const { activity_name: title, description } = result;

		return httpSuccess({
			statusCode: 201,
			data: { title, description },
		});
	} catch (e) {
		return httpError({
			statusCode: 400,
			errorMessage: e.message,
		});
	}
};

exports.deleteAuthor = async id => {
	try {
		delAuthorValidator(id);

		id = parseInt(id);

		const result = await authorRepo.delAuthor(id);

		return httpSuccess({
			statusCode: 200,
			data: result,
		});
	} catch (e) {
		return httpError({
			statusCode: 400,
			errorMessage: e.message,
		});
	}
};
