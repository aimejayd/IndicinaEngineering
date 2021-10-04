const router = require('express').Router();
const {URLController, StatisticController} = require('../controllers');

router.route('/encode').post(URLController.encodeUrl);
router.route('/decode').get(URLController.decodeUrl);
router.route('/list').get(URLController.getAll);
router.route('/statistic').post(StatisticController.recordStats);
router.route('/statistic/:hash').get(StatisticController.viewStats);
router.route('/deleteAll').delete(URLController.deleteAll);

module.exports = router;