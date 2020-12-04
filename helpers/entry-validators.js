exports.firstnameValidator = userEntry => {
	if (!userEntry.firstname) {
		throw new Error('Firstname cannot be empty!');
	} else if (userEntry.firstname.length < 2) {
		throw new Error('Firstname must be at least 2 characters long!');
	}
};

exports.reminderValidator = userEntry => {
	if (!userEntry.title) {
		throw new Error('Every reminder needs to have a title!');
	} else if (!userEntry.description) {
		throw new Error('Every reminder needs to have a description!');
	}
};

exports.delAuthorValidator = id => {
	id = parseInt(id);
	if (!id) {
		throw new Error('Id passed must be a number!');
	} else if (id < 0) {
		throw new Error('Id passed must be a valid number!');
	}
};
