'use strict';

var fs = require('fs');
var util = require('util');

var self;

var WorkflowManager = function(eventEmitter, fount, storageProvider){
    // NOTA: this == undefined, Why?
    self = this;
    console.log(util.format('self %s this %s', self , this));

    var machineProvider = storageProvider.machinesProvider();


    eventEmitter.on('file_received', function(file_name, machine_serial){
        machineProvider
            .getMachineBySerial(machine_serial)
            .then(function(machine) {
                if (machine) {
                    console.log("Upload of " + file_name + " for " + machine_serial + " cfg " + machine.config.facebook.app_id);

                    var imageFullPath = process.cwd() + '/uploads/' + machine_serial + '/' + file_name;
                    // TODO: Overlay skin
                    this.manageFacebookPost(fount, machine.config.facebook, imageFullPath);
                    this.manageTwitterPost(fount, machine.config.twitter, imageFullPath);

                }
            });
    });
};

WorkflowManager.prototype.manageFacebookPost = function(fount, facebookConfig, imageFullPath){
    if(facebookConfig.enabled) {
        fount.resolve( 'fb_service' ).then( function( fb_service ) {
            var postData = {
                accessToken: facebookConfig.access_token,
                imagePath:  fs.createReadStream(imageFullPath),
                message: facebookConfig.message,
                albumId: facebookConfig.album_id
            };

            if(!fb_service.postImage(postData)){
                // TODO: Logging ...
            }
        });
    }
};

WorkflowManager.prototype.manageTwitterPost = function(fount, twitterConfig, imageFullPath){


};


module.exports = exports = WorkflowManager;