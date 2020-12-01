const { createAuthor } = require('./authors-handler');

describe('authors-handler', () => {
	describe('createAuthor', () => {
		it('Check the data types returned by the function', async () => {
			const userEntry = {
				firstname: 'dasdasdaf',
				lastname: 'dasdasdaf',
			};
			const { dataValues } = await createAuthor(userEntry);

			expect(typeof dataValues).toEqual('object');
		});

		it('Will not allow null firstnames', async () => {
			const userEntry = {
				firstname: null,
				lastname: 'dasdasdaf',
			};
			const { message } = await createAuthor(userEntry);
			expect(message).toEqual(
				'notNull Violation: Authors.firstname cannot be null'
			);
		});
	});
});
