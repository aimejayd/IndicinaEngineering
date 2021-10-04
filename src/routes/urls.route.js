const router = require('express').Router();
const {URLController} = require('../controllers');

router.route('/encode').post(URLController.encodeUrl);
router.route('/decode').get(URLController.decodeUrl);
router.route('/list').get(URLController.getAll);
router.route('/deleteAll').delete(URLController.deleteAll);

module.exports = router;