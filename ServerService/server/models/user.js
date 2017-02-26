var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	id: {type: String, require: true},
	name: {type: String, require: true},
	password: {type: String, require: true},
	vehicletype: {type: String}
});
module.exports = mongoose.model('User', userSchema);