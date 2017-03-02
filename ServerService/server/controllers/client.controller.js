var cuid = require('cuid');
var path = require('path');
var Client = require('../models/client');
var exports = module.exports;
// Trả về một khách hàng mà điện thoại viên đã nhập mà chưa được xử lý
exports.getClientToHandle = function (req, res) {
  Client.findOne({status: 'waiting'}).exec((err, client) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(client);
  });
};

exports.getClientByPhone = function (req, res) {
  Client.findOne({phone: req.params.phone}).exec((err, client) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(client);
  });
};


exports.updateClientByPhone = function (req, res) {
  let client = req.body.client;
  Client.update({phone: client.phone}, {
    address: client.address,
    type: client.type,
    note: client.note},
    function (err, numberAffected, rawResponse) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({result: true});
    }
  );
};

/**
 * {client: {
 *    id: 'afwefawefwefwgwe',
 *    status: 'waiting' || 'inprogress' || 'finished'
 * }}
 * @param req
 * @param res
 */
exports.updateClientStatus = function (req, res) {
  let client = req.body.client;
  Client.update({id: client.id}, {status: client.status},
    function (err, numberAffected, rawResponse) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({result: true});
    }
  );
};



// Thêm khách hàng mới
exports.addClient = function (req, res) {
  let client = req.body.client;
  if (typeof client === 'undefined') {
    res.status(403).end();
  }

  let clientModel = new Client(client);
  clientModel.id = cuid();
  clientModel.save((err, clientInserted) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(clientInserted);
  });
};
