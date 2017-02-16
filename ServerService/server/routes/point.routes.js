var Router = require('express').Router;
var PointController = require('../controllers/point.controller');
const router = new Router();

router.route('/point').get(PointController.getPoints);
router.route('/point/get-one').get(PointController.getOnePoint);
router.route('/point').post(PointController.addPoint);
module.exports = router;
