const httpStatus = require('http-status');
const {Statistics} = require('../models');

const recordStats = async (body) => {
	const {url, hash} = body;
	if (!url || !hash) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'url and hash are required body parameter.'}};
	}
	const hashUrl = `http://jayd.io/${hash}`;
	await Statistics.create({url, hash, hashUrl});
	return {status: httpStatus.CREATED, response: {url: url, hash: hash, hashUrl: hashUrl}};
};

const viewStats = async (params) => {
	const {hash} = params;
	if (!hash) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'hash is a required path parameter.'}};
	}
	const urls = await Statistics.find({hash: hash});
	if (!urls.length) {
		return {status: httpStatus.CONFLICT, response: {error: 'No url found for the entered hash.'}};
	}
	return {status: httpStatus.CREATED, response: {totalVisits: urls.length, visits: {urls}}};
};

module.exports = {recordStats, viewStats};