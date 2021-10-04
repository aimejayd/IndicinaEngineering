const catchAsync = require('../utils/catchAsync');
const {URLService} = require('../services');

const encodeUrl = catchAsync(async (req, res) => {
	const {status, response} = await URLService.encodeUrl(req.body);
	return res.status(status).json(response);
});

const decodeUrl = catchAsync(async (req, res) => {
	const {status, response} = await URLService.decodeUrl(req.query);
	return res.status(status).json(response);
});

const getAll = catchAsync(async (req, res) => {
	const {status, response} = await URLService.getAll();
	return res.status(status).json(response);
});

const redirectUrl = catchAsync(async (req, res) => {
	const {status, response} = await URLService.redirectUrl(req.params);
	if (response.error) {
		return res.status(status).json(response);
	}
	return res.status(status).redirect(response.url);
});

const deleteAll = catchAsync(async (req, res) => {
	const {status, response} = await URLService.deleteAll();
	return res.status(status).json(response);
});

module.exports = {encodeUrl, decodeUrl, getAll, redirectUrl, deleteAll};