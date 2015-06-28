var mongoose = require('mongoose');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  github: {}
    
});

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1){ return true; }
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1){ return true; }
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) { throw err; }
      if(user) {
        if(self.id === user.id) { return respond(true); }
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

// Removing internal fields from Json response
UserSchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj._id;
  delete obj.__v;

  delete obj.hashedPassword;
  delete obj.salt;

  return obj;
}

module.exports = mongoose.model('User', UserSchema);