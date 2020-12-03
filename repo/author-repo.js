const { sequelize } = require('../db/db-connection');
const Authors = require('../models/author');
const Reminders = require('../models/reminder');

// const t = sequelize.transaction();

const authorRepo = Object.freeze({
	addAuthor: async userEntry => {
		return await Authors.create(userEntry);
	},
	// delAuthor: async id => {
	// 	try {
	// 		await Authors.destroy(
	// 			{
	// 				where: { id: id },
	// 			},
	// 			{ transaction: t }
	// 		);

	// 		await Reminders.destroy(
	// 			{
	// 				where: { author_id: id },
	// 			},
	// 			{ transaction: t }
	// 		);

	// 		(await t).commit();
	// 	} catch (error) {
	// 		(await t).rollback();
	// 	}
	// },
});

module.exports = authorRepo;
