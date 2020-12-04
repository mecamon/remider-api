const express = require('express');
const { sequelize } = require('./db/db-connection');
const authorController = require('./authors/authors-endpoint');
const reminderController = require('./reminders/reminders-endpoint');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/authors', authorController);
app.use('/reminders', reminderController);

app.listen(port, () => {
	console.log(`Running on ${port}...`);
	testConnectionToDB();
});

const testConnectionToDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully...');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
