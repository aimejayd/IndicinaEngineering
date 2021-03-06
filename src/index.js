// Requiring access to .env file
require('dotenv/config');
// Importing express
const express = require('express');
// An object returned by Express. In other words, it instantiates Express.
const app = express();
// Importing mongoose to connect with mongodb
const mongoose = require('mongoose');
// Importing morgan to view logs
const morgan = require('morgan');
// Importing path to get access to project path
const path = require('path');
// Importing config file
const config = require('../src/config/config');
// Importing cors
const cors = require('cors');

// Body parser
app.use(express.json());

// Enabling cors for localhost:3000 only
const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:3000/'],
};
app.use(cors(corsOptions));

// Api call logs
app.use(morgan('tiny'));

// Connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options, (err, client) => {
	if (err) return console.log(err);
	console.log('Connected to db');
});

// Serve static assets if in productions
if (config.env === 'production') {
	// Redirect
	app.get('/:hash', function (req, res) {
		const id = req.params.hash;
		URL.findOne({_id: id}, function (err, doc) {
			if (doc) {
				res.redirect(doc.url);
			} else {
				res.redirect('/');
			}
		});
	});
	// Set static folder
	app.use(express.static('client/build'));
	// Load static file
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Project main routes
const routes = require('./routes');
app.use('/api', routes);

//Checking the server's health
app.use('/health', (req, res) => {
	res.send('Server is healthy!!');
});

//Redirecting to the original url after providing hash
const {URLController} = require('../src/controllers');
app.use('/:hash', URLController.redirectUrl);

module.exports = app;