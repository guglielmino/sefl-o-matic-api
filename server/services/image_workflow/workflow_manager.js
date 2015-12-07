'use strict';

var fs = require('fs');
var util = require('util');
var logger = require('services/utils/logger');
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

    var execWorkflow = function (imgService, fbService, twService, file_name, machine_serial) {
        machineProvider
            .getMachineBySerial(machine_serial)
            .then(function (machine) {
                if (machine) {
                    logger.info("Upload of " + file_name + " for " + machine_serial + " cfg " + machine.config);

                    var imageFullPath = process.cwd() + '/uploads/' + machine_serial + '/' + file_name;
                    var skinPath = process.cwd() + '/uploads/' + machine_serial + '/skins';

                    self.skinImage(imgService, machine.config.image, imageFullPath, skinPath)
                        .then(function (outputFileName) {
                            logger.info("Image skinned  %s", outputFileName);
                            postOnSocials(fbService, twService, machine, outputFileName);
                        }, function (err) {
                            logger.error(err.message);
                            postOnSocials(fbService, twService, machine, imageFullPath);
                        });
                }
            });
    };

    var postOnSocials = function (fbService, twService, machine, imageFullPath) {
        var facebookConfig = machine.config.facebook;

        if (facebookConfig.enabled) {

            var postData = {
                accessToken: facebookConfig.access_token,
                message: facebookConfig.message,
                albumId: facebookConfig.album_id
            };

            fbService.postImage(postData, imageFullPath)
                .then(function (res) {
                        logger.info("Posted on Facebook");
                    },
                    function (err) {
                        logger.error(util.format("Facebook %s", err.message));
                    });

        }

        var twitterConfig = machine.config.twitter;

        if (twitterConfig.enabled) {

            twService.postImage({
                    consumer_key: twitterConfig.consumer_key,
                    consumer_secret: twitterConfig.consumer_secret,
                    access_token: twitterConfig.access_token,
                    access_token_secret: twitterConfig.access_token_secret,
                    message: twitterConfig.message
                }, imageFullPath)
                .then(function (res) {
                        logger.info("Posted on Twitter");
                    },
                    function (err) {
                        logger.error(util.format("Twitter %s", err.message));
                    });
        }
    };

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
                execWorkflow(imgService, fbService, twService, file_name, machine_serial);
            });
        });
};


WorkflowManager.prototype.skinImage = function (imgService, imageConfig, imageFullPath, skinPath) {
    return imgService
        .watermarkImage({}, imageFullPath, skinPath);
};


module.exports = exports = WorkflowManager;