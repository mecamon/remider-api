const express = require('express');
const route = express.Router();
const { createAuthor } = require('./authors-controller');

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

module.exports = route;
