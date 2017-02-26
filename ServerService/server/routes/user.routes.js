var Router = require('express').Router;
var UserController = require('../controllers/user.controller');

const router = new Router();
router.route('/user/check').post(UserController.checkUser);
module.exports = router;