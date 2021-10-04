const catchAsync = require('../utils/catchAsync');
const {URLService} = require('../services');

const encodeUrl = catchAsync(async (req, res) => {
	const response = await URLService.encodeUrl(req.body);
	res.status(response.status).json(response.response);
});

const decodeUrl = catchAsync(async (req, res) => {
	const response = await URLService.decodeUrl(req.query);
	res.status(response.status).json(response.response);
});

const getAll = catchAsync(async (req, res) => {
	const response = await URLService.getAll();
	res.status(response.status).json(response.response);
});


module.exports = {encodeUrl, decodeUrl, getAll};