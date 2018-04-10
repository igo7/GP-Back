var mongoose = require('mongoose');

var carModel = new mongoose.Schema({
    make: { type: String },
    model: { type: String },
    salvage: { type: Boolean, default: true },
    price: { type: String }
});

var Car = mongoose.model('Car', carModel);
module.exports = Car;