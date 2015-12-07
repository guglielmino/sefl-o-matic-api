/**
 * Initialize DI container
 */

'use strict';

module.exports = function(fount){

    var facebookService = require('./services/tasks/facebook/fb.service');
    fount.register('fb_service', function() { return facebookService; });

    var twitterService = require('./services/tasks/twitter/twitter.service');
    fount.register('twitter_service', function() { return twitterService; });

    var imgProcessingService = require('./services/tasks/image/image-proc.service');
    fount.register('img_processing', function () { return imgProcessingService; });
};