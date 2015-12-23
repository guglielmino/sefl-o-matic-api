'use strict';

angular.module('somapp')
    .factory('SocketService', function SocketService($rootScope) {

        var socket = io('', {
            // Send auth token on connection, you will need to DI the Auth service above
            // 'query': 'token=' + Auth.getToken()
            //path: '/socket-io'
        });

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = [socket];
                    args.push.apply(Array.prototype.slice.call(arguments));

                    $rootScope.$apply(function () {
                        callback.apply(this, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });