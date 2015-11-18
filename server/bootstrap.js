/**
 * Initialize DI container
 */

'use strict';

module.exports = function(fount){
    require('./services/integration/facebook/fb.service')(fount);
};