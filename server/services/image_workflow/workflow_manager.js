'use strict';

var fs = require('fs');
var util = require('util');
var logger = require.main.require('service/utils/logger');

var self;

/**
 * Note: this'll be updated to use a Queue broker in future (RabbitMQ)
 */

/**
 * Handle workflow for every image uploaded by a self-o-matic machine
 *
 * @param eventEmitter {EventEmitter}
 * @param fount
 * @param storageProvider
 * @constructor
 */
var WorkflowManager = function(eventEmitter, fount, storageProvider){
    self = this;

    var machineProvider = storageProvider.machinesProvider();


    eventEmitter.on('file_received', function(file_name, machine_serial){
        machineProvider
            .getMachineBySerial(machine_serial)
            .then(function(machine) {
                if (machine) {
                    console.log("Upload of " + file_name + " for " + machine_serial + " cfg " + machine.config);

                    var imageFullPath = process.cwd() + '/uploads/' + machine_serial + '/' + file_name;

                    var skinnedImage = self.skinImage(fount, machine.config.image, imageFullPath)
                        .then(function(res){
                            self.manageFacebookPost(fount, machine.config.facebook, skinnedImage);
                            self.manageTwitterPost(fount, machine.config.twitter, skinnedImage);
                        });

                }
            });
    });
};

WorkflowManager.prototype.manageFacebookPost = function(fount, facebookConfig, imageFullPath){
    if(facebookConfig.enabled) {
        fount.resolve( 'fb_service' )
            .then( function( fb_service ) {
            var postData = {
                accessToken: facebookConfig.access_token,
                imagePath:  fs.createReadStream(imageFullPath),
                message: facebookConfig.message,
                albumId: facebookConfig.album_id
            };

            if(!fb_service.postImage(postData)){
                logger.error("Post on Facebook failed");
            }
        });
    }
};

WorkflowManager.prototype.manageTwitterPost = function(fount, twitterConfig, imageFullPath){
    if(twitterConfig.enabled){
        fount.resolve( 'twitter_service' )
            .then( function( twitter_service ) {
                twitter_service.postImage({
                        consumer_key: twitterConfig.consumer_key,
                        consumer_secret: twitterConfig.consumer_secret,
                        access_token: twitterConfig.access_token,
                        access_token_secret: twitterConfig.access_token_secret,
                        message: twitterConfig.message
                    }, imageFullPath)
                    .then(function(res){
                        console.log('res ' + res);
                    },
                    function(err){
                        logger.error("Post on Twitter failed");
                    });

            });
    }

};

WorkflowManager.prototype.skinImage = function(fount, imageConfig, imageFullPath){
    fount.resolve( 'img_processing' )
        .then( function( img_processing ) {
            img_processing
                .watermarkImage({}, '/Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/test.jpg');

        });

};


module.exports = exports = WorkflowManager;