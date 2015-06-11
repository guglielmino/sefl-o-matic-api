/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/machines', require('./api/machines'));
  
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
