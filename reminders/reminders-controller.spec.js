const { createReminder, updateReminder } = require('./reminders-controller');

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
});
