'use strict';

var Q = require('q');
var gm = require('gm');
var util = require('util');

var self;

function save(err, image) {
    if (err) throw err;

    image.write('/Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/' + image.name + ".jpg");
}

var ImgProcessingService = function() {
    self = this;
};

ImgProcessingService.prototype.watermarkImage = function(configData, imageFullPath) {
    var deferred = Q.defer();
    gm(imageFullPath)
        .draw(['image Over 0,0 0,0 /Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/mask.png'])
        .write('/Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/output-image.jpg', function(e){
            console.log(e||'done'); // What would you like to do here?
            deferred.resolve(e);
        });

    return deferred.promise;
};

module.exports = function(fount) {
    fount.register('img_processing', function() { return new ImgProcessingService(); });
};

