var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    id: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, required: true, default: 'normal'},
    note: {type: String}
});

module.exports = mongoose.model('Point', pointSchema);