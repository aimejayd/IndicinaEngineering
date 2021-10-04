const httpStatus = require('http-status');
const uniqid = require('uniqid');
const {URLS, Statistics} = require('../models');

const encodeUrl = async (body) => {
	const {url} = body;
	if (!url) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'url is a required body parameter.'}};
	}
	const data = await URLS.findOne({url: url});
	if (data) {
		return {status: httpStatus.CONFLICT, response: {error: 'Url already exists. Try a new url.'}};
	}
	const hash = uniqid();
	const hashUrl = `http://jayd.io/${uniqid()}`;
	await URLS.create({url, hash, hashUrl});
	return {status: httpStatus.CREATED, response: {url: url, hash: hash, hashUrl: hashUrl}};
};

const decodeUrl = async (query) => {
	const {hash} = query;
	if (!hash) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'hash is a required query parameter.'}};
	}
	const url = await URLS.findOne({hash: hash});
	if (!url) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'No url found for the entered hash.'}};
	}
	return {status: httpStatus.OK, response: url};
};

const getAll = async () => {
	const urls = await URLS.find();
	return {status: httpStatus.OK, response: urls};
};

const redirectUrl = async (params) => {
	const {hash} = params;
	if (!hash) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'hash is a required path parameter.'}};
	}
	const url = await URLS.findOne({hash: hash});
	if (!url) {
		return {status: httpStatus.NOT_FOUND, response: {error: 'No url found for the entered hash.'}};
	}
	await Statistics.create({url: url.url, hash: url.hash, hashUrl: url.hashUrl});
	return {status: httpStatus.OK, response: url};
};

const deleteAll = async () => {
	await URLS.deleteMany({});
	await Statistics.deleteMany({});
	return {status: httpStatus.OK, response: 'Records deleted!'};
};

module.exports = {encodeUrl, decodeUrl, getAll, redirectUrl, deleteAll};