var Router = require('express').Router;
var UserController = require('../controllers/user.controller');

const router = new Router();
router.route('/user').get(UserController.getUsers);
router.route('/user/:vehicletype').get(UserController.getUsersByVehicleType);
router.route('/user/check').put(UserController.checkUser);
router.route('/user/:userId').get(UserController.getUser);
router.route('/user/:userId/location').put(UserController.updateLocationUser);
module.exports = router;