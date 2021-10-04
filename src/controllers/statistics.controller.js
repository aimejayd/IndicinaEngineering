const catchAsync = require('../utils/catchAsync');
const {StatisticService} = require('../services');

const recordStats = catchAsync(async (req, res) => {
	const {status, response} = await StatisticService.recordStats(req.body);
	return res.status(status).json(response);
});

const viewStats = catchAsync(async (req, res) => {
	const {status, response} = await StatisticService.viewStats(req.params);
	return res.status(status).json(response);
});

module.exports = {recordStats, viewStats};