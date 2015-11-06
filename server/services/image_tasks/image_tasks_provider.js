'use strict';

var self;

var ImageTasksProvider =  function(eventEmitter){
    eventEmitter.on('file_received', function(file_name, machine_serial){
        console.log("Upload of " +  file_name + " for " + machine_serial);
    });
};

module.exports = exports = ImageTasksProvider;