const { httpSuccess, httpError } = require('../helpers/reponse-generator');
const {
	firstnameValidator,
	reminderValidator,
	delValidator,
} = require('../helpers/entry-validators');
const authorRepo = require('../repo/author-repo');

exports.createReminder = async userEntry => {
	try {
		reminderValidator(
			userEntry,
			'Every reminder needs to have a title!',
			'Every reminder needs to have a description!'
		);

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

exports.updateReminder = async newReminder => {
	try {
		reminderValidator(
			newReminder,
			'The new title must not be empty!',
			'The new description must not be empty!'
		);

		const result = await authorRepo.modifyReminder(newReminder);

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

exports.deleteReminder = async id => {
	try {
		delValidator(id);

		id = parseInt(id);

		const result = await authorRepo.delReminder(id);

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

exports.registerAndReminder = async data => {
	try {
		const { newAuthor, newReminder } = data;

		firstnameValidator(newAuthor);

		reminderValidator(
			newReminder,
			'Every reminder needs to have a title!',
			'Every reminder needs to have a description!'
		);

		const result = await authorRepo.addAuthorAndReminder({
			newAuthor,
			newReminder,
		});

		return httpSuccess({
			statusCode: 201,
			data: result,
		});
	} catch (e) {
		return httpError({
			statusCode: 400,
			errorMessage: e.message,
		});
	}
};

exports.getReminders = async queryParams => {
	try {
		const { page, author, state } = queryParams;

		const result = await authorRepo.listReminders({ page, author, state });

		return httpSuccess({
			statusCode: 200,
			data: result,
		});
	} catch (e) {
		return httpError({
			statusCode: 400,
			errorMessage: e,
		});
	}
};
