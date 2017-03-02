var cuid = require('cuid');
var User = require('../models/user.js');
var exports = module.exports;

exports.checkUser = function(req, res)
{
	let name = req.body.name;
	let pass = req.body.password;
	User.findOne({name: name, password: pass}).exec((err, user) => {
	    if (err) {
	      res.status(500).send(err);
	    }
	    if (user) {
	    	res.json(user);
	    } else {
	    	res.json(null);
	    }
  	});
};

exports.getUser = function (req, res) {
	let id = req.params.userId;
    User.findOne({id: id}).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            res.json(user);
        } else {
            res.json(null);
        }
    });
};

exports.updateUser = function (req, res) {

};

exports.getUsers = function (req, res) {
	User.find({},'-_id -__v').exec((err, users) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(users);
	});
};

exports.getUsersByVehicleType = function (req, res) {
	let vehicletype = req.params.vehicletype;
	User.find({vehicletype},'-_id -__v').exec((err, users) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(users);
	});
};