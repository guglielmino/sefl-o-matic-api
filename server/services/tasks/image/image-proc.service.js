'use strict';

var Q = require('q');
var gm = require('gm');
var util = require('util');
var path = require('path');
var fs = require('fs');


var self;

function save(err, image) {
    if (err) {
        throw err;
    }

    image.write('/Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/' + image.name + ".jpg");
}

var ImgProcessingService = function () {
    self = this;
};

ImgProcessingService.prototype.watermarkImage = function (configData, imageFullPath, skinPath) {
    var deferred = Q.defer();

    var files = [];
    if (fs.existsSync(skinPath)) {

        files = fs.readdirSync(skinPath)
            .filter(function (item) {
                return (item.indexOf(".jpg") > -1 || item.indexOf(".png") > -1);
            })
            .map(function (item) {
                return util.format('%s/%s', skinPath, item);
            });
    }

    if (files.length > 0) {
        var fileIndex = Math.floor(Math.random() * files.length);
        var outputFileName = util.format(
            '%s/%s-wm%s',
            path.dirname(imageFullPath),
            path.basename(imageFullPath, path.extname(imageFullPath)),
            path.extname(imageFullPath)
        );

        var mask = files[fileIndex];
        gm(imageFullPath)
            .draw([util.format('image Over 0,0 0,0 %s', mask)])
            .write(outputFileName, function (e) {
                if (e instanceof Error) {
                    deferred.reject(e);
                }
                else {
                    deferred.resolve(outputFileName);
                }
            });
    }
    else {
        deferred.reject(new Error('No skin file found'));
    }

    return deferred.promise;
};

module.exports = new ImgProcessingService();

