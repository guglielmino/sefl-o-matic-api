'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://selfie:123start@ds045734.mongolab.com:45734/selfomatic-test',
    dropdb: true,
    seedTestData: true
  }
};