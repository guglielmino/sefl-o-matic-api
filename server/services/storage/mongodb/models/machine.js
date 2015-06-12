var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
    serial : {type: String, index: true},
    name: String
});

module.exports = mongoose.model('Machine', MachineSchema);