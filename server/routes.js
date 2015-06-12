/**
 * Main application routes
 */

'use strict';

module.exports = function(app, storageProvider) {

  var machinesProvider = storageProvider.machinesProvider();
  var machinesController = require('./api/machines')(machinesProvider);
 
  // Routes
  app.use('/api/machines', machinesController);
  
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
