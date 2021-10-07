require('dotenv').config({path: '../../.env'});

const envVars = process.env;

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGOURI,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
