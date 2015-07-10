/**
 * Main application routes
 */

'use strict';

module.exports = function(app, storageProvider, socketProvider) {

  var machinesProvider = storageProvider.machinesProvider();
  var machinesController = require('./api/machines')(machinesProvider, socketProvider);

  var usersProvider = storageProvider.usersProvider();
  var auth = require('./auth')(usersProvider, socketProvider);

  var usersController = require('./api/users')(usersProvider, socketProvider);

  // Routes
  app.use('/api/machines', machinesController);
  app.use('/api/users', usersController);

  app.use('/auth', auth);
  
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
