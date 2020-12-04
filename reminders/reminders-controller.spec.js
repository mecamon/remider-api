const {
	createReminder,
	updateReminder,
	deleteReminder,
	registerAndReminder,
} = require('./reminders-controller');

describe('reminders-controller', () => {
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

	describe('updateReminder', () => {
		it('Vefifies that the new title is NOT empty', async () => {
			const newReminder = {
				author_id: 8,
				title: undefined,
				description: 'gasdfasasvas',
			};

			const result = await updateReminder(newReminder);

			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'The new title must not be empty!',
				}),
			});
		});

		it('Vefifies that the new description is NOT empty', async () => {
			const newReminder = {
				id: 8,
				title: 'gasdfasasvasasdasdasda',
				description: undefined,
			};

			const result = await updateReminder(newReminder);

			expect(result).toEqual({
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				data: JSON.stringify({
					success: false,
					error: 'The new description must not be empty!',
				}),
			});
		});
	});

	describe('registerAndReminder', () => {
		it('Will NOT allow a author with an empty firstname', async () => {
			const newAuthor = {
				firstname: undefined,
				lastname: 'dasdagsfg',
			};

			const newReminder = {
				author_id: 8,
				title: 'gasdfasasvas',
				description: 'gasdfasasvas',
			};

			const result = await registerAndReminder({
				newAuthor,
				newReminder,
			});

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

		it('Vefifies that the new title is NOT empty', async () => {
			const newAuthor = {
				firstname: 'dasdagsfg',
				lastname: 'dasdagsfg',
			};

			const newReminder = {
				author_id: 8,
				title: undefined,
				description: 'gasdfasasvas',
			};

			const result = await registerAndReminder({
				newAuthor,
				newReminder,
			});

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

		it('Vefifies that the new description is NOT empty', async () => {
			const newAuthor = {
				firstname: 'dasdagsfg',
				lastname: 'dasdagsfg',
			};

			const newReminder = {
				id: 8,
				title: 'gasdfasasvasasdasdasda',
				description: undefined,
			};

			const result = await registerAndReminder({
				newAuthor,
				newReminder,
			});

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

	describe('deleteReminder', () => {
		it('Verify if the id passed if a number', async () => {
			const id = 'not a number';
			const result = await deleteReminder(id);
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
			const result = await deleteReminder(id);
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
