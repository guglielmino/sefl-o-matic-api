var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
  serial: {
    type: String,
    index: {
      unique: true,
      sparse: true
    }
  },
  name: String,
  config: {
    fb_app_id: String,
    fb_app_secret: String,
    fb_access_token: String,
    fb_album_id: String,
    hflip_image: Boolean,
    watermark_image: String,
    pushetta_api_key: String,
    pushetta_channel: String,
    telegram_token: String,
    tw_consumer_key: String,
    tw_consumer_secret: String,
    tw_access_token: String,
    tw_access_token_secret: String,
    db_access_token: String

  }
});


MachineSchema.set('toJSON', {
  virtuals: true
});
MachineSchema.set('toObject', {
  virtuals: true
});

// Removing internal fields from Json response
MachineSchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj._id;
  delete obj.__v;

  return obj;
}

/**
 * Virtuals
 */
MachineSchema
  .virtual('isOn')
  .set(function(isOn) {
    this._isOn = isOn;
  })
  .get(function() {
    return this._isOn;
  });

module.exports = mongoose.model('Machine', MachineSchema);