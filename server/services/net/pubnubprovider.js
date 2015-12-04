'use strict';

var Q = require('q');

var self;


var PubNubProvider = function(config) {
    self = this;
    this.pubnub = require("pubnub")({
        ssl           : true,  // <- enable TLS Tunneling over TCP
        publish_key   : config.publish_key,
        subscribe_key : config.subscribe_key
    });

    // Master channel is where machines push their data (serial number)
    this.pubnub .subscribe({
        channel  : "master",
        callback : onSubscribeMaster
    });

    function onSubscribeMaster(message){
        console.log( " > ", message );
    }
};


/**
 * onConnect - event fired when a client connect
 *
 * @api public
 */
PubNubProvider.prototype.onConnect = function() {

};

/**
 * sendTo - send a realtime event to a machine associated to a serial
 *
 * @param {String} serial
 * @param {String} event
 * @param {Object} data
 * @return {Boolean}
 * @api public
 */
PubNubProvider.prototype.sendTo = function(serial, event, data) {

};

/**
 * sendBroadcast - send a event to all connected machines
 *
 * @return {String}
 * @api public
 */
PubNubProvider.prototype.sendBroadcast = function(event, data) {

};

module.exports = PubNubProvider;