var express = require('express');

var routes = (Book) => {

    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);
    console.log('bookController', bookController);
    //console.log(bookRouter.route);
    bookRouter.use('/id/:id', bookController.findByIdInterceptor);

    bookRouter.route('/')
        .get(bookController.getAll)
        .post(bookController.post);

    bookRouter.route('/id/:id')
        .get(bookController.findById)
        .put(bookController.update)
        .patch(bookController.patch)
        .delete(bookController.remove);

    bookRouter.route('/test').get(bookController.getReadBooks);

    return bookRouter;
}

module.exports = routes;