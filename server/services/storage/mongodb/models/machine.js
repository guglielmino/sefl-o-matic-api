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
  ip_address: String,
  config: {
    facebook: {
      enabled: Boolean,
      app_id: String,
      app_secret: String,
      access_token: String,
      album_id: String,
      message: String
    },
    twitter: {
      enabled: Boolean,
      consumer_key: String,
      consumer_secret: String,
      access_token: String,
      access_token_secret: String,
      message: String
    },
    image: {
      hflip_image: Boolean,
      watermark_image: String,
      bightness: Number,
      image_effect: String
    },
    pushetta: {
      enabled: Boolean,
      api_key: String,
      channel: String
    },
    telegram: {
      enabled: Boolean,
      token: String
    },
    dropbox: {
      enabled: Boolean,
      access_token: String
    }
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