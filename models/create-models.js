const Authors = require('./author');
const Reminders = require('./reminder');

(async function () {
	await Authors.sync({ alter: true });
	console.log('Author model created!');
})();

(async function () {
	await Reminders.sync({ alter: true });
	console.log('Reminders model created!');
})();
