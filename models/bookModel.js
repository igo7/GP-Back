var mongoose = require('mongoose');

//console.log('mongoose', mongoose);
var bookModel = new mongoose.Schema({ // must use mongoose.Schema syntax
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: true }
});

var Book = mongoose.model('Book', bookModel);
module.exports = Book;