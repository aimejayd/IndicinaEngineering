const express = require('express');
const router = express.Router();
const Url = require('./urls.route');

const defaultRoutes = [
	{
		path: '/',
		route: Url,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;