const express = require('express');
const { sequelize } = require('./db/db-connection');

const app = express();
const port = process.env.PORT || 5000;

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
