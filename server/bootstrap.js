/**
 * Initialize DI container
 */

'use strict';

module.exports = function(fount){
    require('./services/tasks/facebook/fb.service')(fount);
    require('./services/tasks/twitter/twitter.service')(fount);
    require('./services/tasks/image/image-proc.service')(fount);
};