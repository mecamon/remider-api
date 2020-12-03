const { createAuthor } = require('./authors-controller');

describe('author-controller', () => {
	describe('createAuthor', () => {
		it('Will NOT allow a author with an empty firstname', async () => {
			const userEntry = {
				firstname: undefined,
				lastname: 'dasdagsfg',
			};
			const result = await createAuthor(userEntry);

			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'Firstname cannot be empty!',
				}),
			});
		});

		it('Will NOT allow a firstname with less than 2 characters', async () => {
			const userEntry = {
				firstname: 'b',
				lastname: 'dasdagsfg',
			};
			const result = await createAuthor(userEntry);
			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'Firstname must be at least 2 characters long!',
				}),
			});
		});
	});
});
