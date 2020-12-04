const { sequelize } = require('../db/db-connection');
const Authors = require('../models/author');
const Reminders = require('../models/reminder');

const authorRepo = Object.freeze({
	addAuthor: async userEntry => {
		return await Authors.create(userEntry);
	},
	addReminder: async ({ author_id, title, description }) => {
		return await Reminders.create({
			author_id: author_id,
			activity_name: title,
			description: description,
		});
	},
	delAuthor: async id => {
		try {
			const result = await sequelize.transaction(async t => {
				await Reminders.destroy(
					{
						where: {
							author_id: id,
						},
					},
					{ transaction: t }
				);

				const userDeleted = await Authors.destroy(
					{ where: { id: id } },
					{ transaction: t }
				);
				return userDeleted;
			});
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	modifyReminder: async ({ id, title, description }) => {
		const modifiedReminder = await Reminders.update(
			{
				activity_name: title,
				description: description,
			},
			{ where: { id: id } }
		);

		return modifiedReminder;
	},
	delReminder: async id => {
		return await Reminders.destroy({ where: { id: id } });
	},
	addAuthorAndReminder: async ({ newAuthor, newReminder }) => {
		try {
			const result = await sequelize.transaction(async t => {
				const { id } = await Authors.create(newAuthor, {
					transaction: t,
				});

				const adaptedReminder = {
					author_id: id,
					activity_name: newReminder.title,
					description: newReminder.description,
				};

				const { dataValues } = await Reminders.create(adaptedReminder, {
					transaction: t,
				});

				return dataValues;
			});
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	listReminders: async ({ page = 1, author, state }) => {
		let queryFilter = null;
		let quantity = null;

		if (!author && !state) {
			queryFilter = {
				attributes: [['activity_name', 'title'], 'description'],
			};
			quantity = await Reminders.count();
		} else if (author && !state) {
			queryFilter = {
				attributes: [['activity_name', 'title'], 'description'],
				where: { author_id: author },
			};
			quantity = await Reminders.count({ where: { author_id: author } });
		}

		const limit = 10;
		const currentPage = page;
		const totalOfPages = Math.ceil(quantity / limit);

		queryFilter.limit = limit;
		queryFilter.offset = (currentPage - 1) * limit;

		const reminders = await Reminders.findAll(queryFilter);

		return {
			totalOfPages: totalOfPages,
			reminders: reminders,
		};
	},
});

module.exports = authorRepo;
