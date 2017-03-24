var express = require('express');

var routes = (Book) => {

    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);
    console.log('bookController', bookController);
    //console.log(bookRouter.route);
    bookRouter.use('/:id', (req, res, next) => {
        Book.findById(req.params.id, (err, resp) => {
            if (err) {
                res.status(500).send(err);
            } else if (resp) {
                req.book = resp;
                next();
            } else {
                res.status(404).send(err);
            }
        });
    });

    bookRouter.route('/')
        .get(bookController.getAll)
        .post(bookController.post);

    bookRouter.route('/:id')
        .get(bookController.findById)
        .put(bookController.update)
        .patch(bookController.patch)
        .delete(bookController.remove);

    return bookRouter;
}

module.exports = routes;