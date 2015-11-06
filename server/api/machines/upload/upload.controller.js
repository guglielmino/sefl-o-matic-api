'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var multer  = require('multer');

var self;

var UploadController = function(machineSocketController, eventEmitter) {
    this.socketController = machineSocketController;

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {

            var dest_dir = 'uploads/' + req.params.serialnumber;
            if (!fs.existsSync(dest_dir)){
                fs.mkdirSync(dest_dir);
            }

            cb(null, dest_dir);
        },
        filename: function (req, file, cb) {
            var file_name = path.parse(file.fieldname).name;
            var file_ext = path.extname(file.fieldname);
            var full_file_name = file_name + '-' +  Date.now() + file_ext;

            eventEmitter.emit('file_received',  full_file_name, String(req.params.serialnumber));
            // Nota: il filename viene rinominato con l'aggiunta di un timestamp per evitare duplicati

            cb(null, full_file_name);
        }
    });

    this.upload = multer(
        {
            storage: storage,
            dest: 'uploads'
        }).any();


    self = this;
};

UploadController.prototype.uploadImage = function(req, res) {
    self.upload(req,res,function(err) {
        if(err) {
            res.status(400).send(err);
        }
        res.json(200, {});
    });

};

module.exports = UploadController;