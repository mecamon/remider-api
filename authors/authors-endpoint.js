const express = require('express');
const route = express.Router();
const {
	createAuthor,
	createReminder,
	deleteAuthor,
} = require('./authors-controller');

route.get('/', (req, res) => {
	res.send('Hello from GET');
});

route.post('/', (req, res) => {
	createAuthor(req.body)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

route.delete('/:id', (req, res) => {
	deleteAuthor(req.params.id)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

route.post('/reminder', (req, res) => {
	createReminder(req.body)
		.then(({ headers, statusCode, data }) => {
			res.set(headers).status(statusCode).send(data);
		})
		.catch(e => res.status(500).end());
});

module.exports = route;
