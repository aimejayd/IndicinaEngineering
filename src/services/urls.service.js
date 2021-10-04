const httpStatus = require('http-status');
const uniqid = require('uniqid');
const {URLS} = require('../models');

const encodeUrl = async (body) => {
	const {url} = body;
	if (!url) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'url is a required body parameter.'}};
	}
	const data = await URLS.findOne({url});
	if (data) {
		return {status: httpStatus.CONFLICT, response: {error: 'url already exists. Try a new url.'}};
	}
	const hashUrl = `http://short.est/${uniqid()}`;
	await URLS.create({url, hashUrl});
	return {status: httpStatus.CREATED, response: {url: url, hashUrl: hashUrl}};
}

const decodeUrl = async (query) => {
	const {hashUrl} = query;
	if (!hashUrl) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'hashUrl is a required query parameter.'}};
	}
	const url = await URLS.findOne({hashUrl: hashUrl});
	if (!url) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'No url found for this hashUrl.'}};
	}
	return {status: httpStatus.OK, response: url};
}

const getAll = async () => {
	const urls = await URLS.find();
	return {status: httpStatus.OK, response: urls};
}

module.exports = {encodeUrl, decodeUrl, getAll};