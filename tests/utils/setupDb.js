const mongoose = require('mongoose');
const config = require('../../src/config/config');

async function openConnection() {
	try {
		await mongoose.connect(config.mongoose.url, config.mongoose.options);
	} catch (error) {
		console.log(error);
	}
}

async function closeConnection() {
	await mongoose.disconnect();
}

module.exports = {openConnection, closeConnection};
