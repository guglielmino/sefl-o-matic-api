var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
    serial: {type: String, index: {unique: true, sparse: true}},
    name: String,
    config: {
    	fb_app_id: String,
    	fb_app_secret: String,
      fb_access_token: String,
      fb_album_id: String,
      hflip_image: Boolean,
      watermark_image: String,
      pushetta_api_key: String,
      pushetta_channel: String
    }
});

// Removing internal fields from Json response
MachineSchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj._id;
  delete obj.__v;

  return obj;
}

module.exports = mongoose.model('Machine', MachineSchema);