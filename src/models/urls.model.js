const mongoose = require('mongoose');
const {Schema} = mongoose;

// Creation of the db Schema
const UrlSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	hash: {
		type: String,
		required: true,
	},
	hashUrl: {
		type: String,
		required: true,
	},
}, {timestamps: true});

module.exports = mongoose.model('ShortendUrl', UrlSchema);