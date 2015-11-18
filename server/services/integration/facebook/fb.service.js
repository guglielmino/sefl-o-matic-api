'use strict';

var self;

var FacebookService = function(){
    self = this;
    self.FB = require('fb');
};

FacebookService.prototype.postImage = function(image){
   /* FB.setAccessToken('access_token');

    var body = 'My first post using facebook-node-sdk';
    FB.api('me/feed', 'post', { message: body}, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('Post Id: ' + res.id);
    });*/
    console.log("postImage " + self.FB);
};

module.exports = function(fount) {
    fount.register('fb_service', function() { return new FacebookService(); });
};

