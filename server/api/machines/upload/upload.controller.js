'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');

var multer  = require('multer');
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
        // Nota: il filename viene rinominato con l'aggiunta di un timestamp per evitare duplicati
        cb(null, file_name + '-' +  Date.now() + file_ext);
    }
})

var upload = multer(
    {
        storage: storage,
        dest: 'uploads'
    }).any();


var self;

var UploadController = function(machineSocketController) {
    this.socketController = machineSocketController;
    self = this;
};

UploadController.prototype.uploadImage = function(req, res) {
    upload(req,res,function(err) {
        if(err) {
            res.status(400).send(err);
        }
        res.json(200, {});
    });

};

module.exports = UploadController;