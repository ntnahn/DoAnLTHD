var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: {type: String, require: true},
    name: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    status: {type: String, require: true},
    location: {
        lat: {type: Number, require: true},
        lng: {type: Number, require: true}
    },
    vehicletype: {type: String} // normal || premium
});
module.exports = mongoose.model('User', userSchema);