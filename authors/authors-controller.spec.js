const {
	createAuthor,
	createReminder,
	deleteAuthor,
} = require('./authors-controller');

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

	describe('createReminder', () => {
		it('Will NOT allow a reminder without a title', async () => {
			const entryReminder = {
				author_id: 8,
				title: undefined,
				description: 'gasdfasasvas',
			};
			const result = await createReminder(entryReminder);
			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'Every reminder needs to have a title!',
				}),
			});
		});

		it('Will NOT allow a reminder without a description', async () => {
			const entryReminder = {
				author_id: 8,
				title: 'asdbgrfhfad',
				description: undefined,
			};
			const result = await createReminder(entryReminder);
			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'Every reminder needs to have a description!',
				}),
			});
		});
	});

	describe('deleteAuhor', () => {
		it('Verify if the id passed if a number', async () => {
			const id = 'not a number';
			const result = await deleteAuthor(id);
			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'Id passed must be a number!',
				}),
			});
		});

		it('Verify if the id passed if a positive number', async () => {
			const id = -2;
			const result = await deleteAuthor(id);
			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'Id passed must be a valid number!',
				}),
			});
		});
	});
});
