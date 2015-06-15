var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
    serial: {type: String, index: {unique: true, sparse: true}},
    name: String
});

// Removing internal fields from Json response
MachineSchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj._id;
  delete obj.__v;

  return obj;
}

module.exports = mongoose.model('Machine', MachineSchema);