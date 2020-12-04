const express = require('express');
const route = express.Router();
const {
	createReminder,
	updateReminder,
	deleteReminder,
	registerAndReminder,
} = require('./reminders-controller');

route.get('/', (req, res) => {
	res.send('Hello from GET');
});

route.post('/', (req, res) => {
	createReminder(req.body)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

route.post('/author', (req, res) => {
	registerAndReminder(req.body)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

route.put('/', (req, res) => {
	updateReminder(req.body)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

route.delete('/:id', (req, res) => {
	deleteReminder(req.params.id)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

module.exports = route;
