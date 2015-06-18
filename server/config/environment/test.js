'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/selfomatic-test',
    dropdb: true,
    seedTestData: true
  }
};