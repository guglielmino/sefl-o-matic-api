'use strict';

var https = require('https');
var FormData = require('form-data');
var Q = require('q');

var self;

var FacebookService = function() {
    self = this;
};

FacebookService.prototype.postImage = function(configData, imageFullPath) {
    var deferred = Q.defer();

    var form = new FormData();
    form.append('file',  imageFullPath);
    form.append('message', configData.message);

    //POST request options, notice 'path' has access_token parameter
    var options = {
        method: 'post',
        host: 'graph.facebook.com',
        path: '/' + configData.albumId + '/photos?access_token=' + configData.accessToken,
        headers: form.getHeaders()
    };

    //Do POST request, callback for response
    var request = https.request(options, function (res){
        console.log("fb res " + res.statusCode.toString() + ' -- ' + res.statusMessage );
        deferred.resolve(res);
    });

    form.pipe(request);

    request.on('error', function (err) {
        deferred.reject(err);
    });

    return deferred.promise;
};

module.exports = function(fount) {
    fount.register('fb_service', function() { return new FacebookService(); });
};

