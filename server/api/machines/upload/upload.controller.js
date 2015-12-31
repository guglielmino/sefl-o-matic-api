'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var multer = require('multer');

var self;

var UploadController = function (machineSocketController, eventEmitter) {
    this.socketController = machineSocketController;

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {

            var destDir = 'uploads/' + req.params.serialnumber;
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir);
            }

            cb(null, destDir);
        },
        filename: function (req, file, cb) {
            var fileName = path.parse(file.fieldname).name;
            var fileExt = path.extname(file.fieldname);
            var fullFileName = fileName + '-' + Date.now() + fileExt;

            eventEmitter.emit('file_received', fullFileName, String(req.params.serialnumber));
            // Nota: il filename viene rinominato con l'aggiunta di un timestamp per evitare duplicati

            cb(null, fullFileName);
        }
    });

    this.upload = multer(
        {
            storage: storage,
            dest: 'uploads'
        }).any();
};

UploadController.prototype.uploadImage = function (req, res) {
    self.upload(req, res, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({});
    });
};

UploadController.prototype.listFiles = function (req, res) {
    var uploadsBasePath = req.app.get('uploads_url_path');

    var filesDir = 'uploads/' + req.params.serialnumber;
    var files = [];

    if (fs.existsSync(filesDir)) {
        files = fs.readdirSync(filesDir)
            .filter(function (item) {
                return (item.indexOf('.jpg') > -1 || item.indexOf('.png') > -1);
            })
            .map(function (item) {
                return util.format('%s/%s/%s', uploadsBasePath, req.params.serialnumber, item);
            });
    }
    res.status(200).json(files);
};

module.exports = UploadController;