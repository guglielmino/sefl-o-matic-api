var mongoose = require('mongoose');

module.exports = function(mongoose) {
    var Machine = new mongoose.Schema({
        serial : {type: String, index: true},
        name: String
    });

    var models = {
      Machines : mongoose.model('Machines', Machine)
    };
    return models;
}