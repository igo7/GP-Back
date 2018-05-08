var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    username: {type: String},
    Email: {type: String},
    password: {type: String},
    image_url: {type: String}
});

module.exports= mongoose.model('user', userModel);