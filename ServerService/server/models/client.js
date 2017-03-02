var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, required: true, default: 'normal'}, // normal || premium
    note: {type: String},
    status: {type: String, required: true, default: 'waiting'} // waiting || inprogress || finished
});

module.exports = mongoose.model('Client', clientSchema);