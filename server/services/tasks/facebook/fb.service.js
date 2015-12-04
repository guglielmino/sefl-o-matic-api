'use strict';

var https = require('https');
var FormData = require('form-data');


var self;

var FacebookService = function() {
    self = this;
};

FacebookService.prototype.postImage = function(configData, imageFullPath) {
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
        // TODO: Log
    });

    //Binds form to request
    form.pipe(request);

    //If anything goes wrong (request-wise not FB)
    request.on('error', function (error) {
        console.log("error" + error);
        // TODO: Log
    });
};

module.exports = function(fount) {
    fount.register('fb_service', function() { return new FacebookService(); });
};

