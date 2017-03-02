var Router = require('express').Router;
var ClientController = require('../controllers/client.controller.js');
const router = new Router();

router.route('/client/get-client-to-handle').get(ClientController.getClientToHandle);
router.route('/client/get-client-by-phone/:phone').get(ClientController.getClientByPhone);
router.route('/client/update-by-phone').post(ClientController.updateClientByPhone);
router.route('/client').post(ClientController.addClient);

module.exports = router;
