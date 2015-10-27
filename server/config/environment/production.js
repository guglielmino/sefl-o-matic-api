'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.IP ||
    undefined,

  // Server port
  port: process.env.PORT ||
    8080,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + (process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost:') + (process.env.MONGO_PORT_27017_TCP_PORT || '27017') + '/selfomaticapi'
  }
};