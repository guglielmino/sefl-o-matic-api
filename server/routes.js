/**
 * Main application routes
 */

'use strict';

module.exports = function(app, storageProvider, socketProvider, eventEmitter) {

  var usersProvider = storageProvider.usersProvider();
  var authModule = require('./auth')(usersProvider, socketProvider);

  var machinesProvider = storageProvider.machinesProvider();

  var machinesModule = require('./api/machines')(machinesProvider, usersProvider, socketProvider, eventEmitter);

  var usersModule = require('./api/users')(usersProvider, socketProvider);

  // Routes
  app.use('/api/machines', machinesModule);
  app.use('/api/users', usersModule);

  app.use('/auth', authModule);
  
   app.route('/:url(api|auth|components|app|bower_components|assets|static)/*').get(function(req, res) {
    return res.status(404).send({
      message: 'route not found'
    });
  });

  app.route('/*').get(function(req, res) {
    return res.status(404).send({
      message: 'route not found'
    });
  });
};
