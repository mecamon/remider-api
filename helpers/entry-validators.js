exports.firstnameValidator = userEntry => {
	if (!userEntry.firstname) {
		throw new Error('Firstname cannot be empty!');
	} else if (userEntry.firstname.length < 2) {
		throw new Error('Firstname must be at least 2 characters long!');
	}
};
