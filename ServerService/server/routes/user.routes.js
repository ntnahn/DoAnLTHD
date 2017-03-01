var Router = require('express').Router;
var UserController = require('../controllers/user.controller');

const router = new Router();
router.route('/user/check').put(UserController.checkUser);
router.route('/user/:userId').get(UserController.getUser);
router.route('/user/:userId').put(UserController.updateUser);
module.exports = router;