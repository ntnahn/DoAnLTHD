var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, required: true, default: 'normal'},
    note: {type: String},
    status: {type: String, required: true, default: 'waiting'} // waiting || finished
});

module.exports = mongoose.model('Client', clientSchema);