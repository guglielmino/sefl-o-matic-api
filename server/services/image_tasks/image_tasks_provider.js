'use strict';

/*
    1. Retrieve machine data (Config)
    2. For every social check if enabled
    3. If enabled get instance of provider
    4. Post image using config data

 */

var ImageTasksProvider =  function(eventEmitter, fount){

    fount.resolve( 'fb_service' ).then( function( fb_service ) {
        console.log(fb_service.postImage({}));
    } );

    eventEmitter.on('file_received', function(file_name, machine_serial){
        console.log("Upload of " +  file_name + " for " + machine_serial);
    });
};

module.exports = exports = ImageTasksProvider;