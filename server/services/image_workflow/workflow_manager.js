'use strict';

var fs = require('fs');
var util = require('util');
var logger = require.main.require('./services/utils/logger');
var Q = require('q');

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
var WorkflowManager = function (eventEmitter, fount, storageProvider) {
    self = this;

    var machineProvider = storageProvider.machinesProvider();


    Q.all([
            fount.resolve('img_processing'),
            fount.resolve('fb_service'),
            fount.resolve('twitter_service')
        ])
        .then(function (res) {
            var imgService = res.shift();
            var fbService = res.shift();
            var twService = res.shift();

            eventEmitter.on('file_received', function (file_name, machine_serial) {
                machineProvider
                    .getMachineBySerial(machine_serial)
                    .then(function (machine) {
                        if (machine) {
                            logger.info("Upload of " + file_name + " for " + machine_serial + " cfg " + machine.config);

                            var imageFullPath = process.cwd() + '/uploads/' + machine_serial + '/' + file_name;
                            var skinPath = process.cwd() + '/uploads/' + machine_serial + '/skins';

                            self.skinImage(imgService, machine.config.image, imageFullPath, skinPath)
                                .then(function (outputFileName) {
                                    self.manageFacebookPost(fbService, machine.config.facebook, outputFileName);
                                    self.manageTwitterPost(twService, machine.config.twitter, outputFileName);
                                }, function (err) {
                                    logger.error(err.message);
                                    self.manageFacebookPost(fbService, machine.config.facebook, imageFullPath);
                                    self.manageTwitterPost(twService, machine.config.twitter, imageFullPath);
                                });

                        }
                    });
            });
        });


};

WorkflowManager.prototype.manageFacebookPost = function (fbService, facebookConfig, imageFullPath) {
    if (facebookConfig.enabled) {

        var postData = {
            accessToken: facebookConfig.access_token,
            imagePath: fs.createReadStream(imageFullPath),
            message: facebookConfig.message,
            albumId: facebookConfig.album_id
        };

        if (!fbService.postImage(postData)) {
            logger.error("Post on Facebook failed");
        }

    }
};

WorkflowManager.prototype.manageTwitterPost = function (twService, twitterConfig, imageFullPath) {
    if (twitterConfig.enabled) {

        twService.postImage({
                consumer_key: twitterConfig.consumer_key,
                consumer_secret: twitterConfig.consumer_secret,
                access_token: twitterConfig.access_token,
                access_token_secret: twitterConfig.access_token_secret,
                message: twitterConfig.message
            }, imageFullPath)
            .then(function (res) {
                    console.log('res ' + res);
                },
                function (err) {
                    logger.error("Post on Twitter failed");
                });
    }

};

WorkflowManager.prototype.skinImage = function (imgService, imageConfig, imageFullPath, skinPath) {
    return imgService
        .watermarkImage({}, imageFullPath, skinPath);
};


module.exports = exports = WorkflowManager;