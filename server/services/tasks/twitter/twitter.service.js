'use strict';

var Q = require('q');
var Twitter = require('node-twitter');

var self;

var TwitterService = function() {
    self = this;
};

TwitterService.prototype.postImage = function(configData, imageFullPath) {
    var deferred = Q.defer();

    var twitterRestClient = new Twitter.RestClient(
        configData.consumer_key,
        configData.consumer_secret,
        configData.access_token,
        configData.access_token_secret
    );

    twitterRestClient.statusesUpdateWithMedia(
        {
            'status': (configData.message || ' '),
            'media[]': imageFullPath
        },
        function(err, result) {
            if (err) {
                deferred.reject(err);
            }

            if (result) {
                deferred.resolve(result);

            }
        });
    return deferred.promise;
};

module.exports = new TwitterService();
