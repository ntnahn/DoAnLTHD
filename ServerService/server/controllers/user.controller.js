var cuid = require('cuid');
var User = require('../models/user.js');
var exports = module.exports;

exports.checkUser = function(req, res)
{
	let name = req.body.name;
	let pass = req.body.password
	User.findOne({name: name, password: pass}).exec((err, user) => {
	    if (err) {
	      res.status(500).send(err);
	    }
	    if (user) {
	    	res.json(true);
	    } else {
	    	res.json(false);
	    }
    	
  	});
};