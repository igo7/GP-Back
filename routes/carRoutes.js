var express = require('express');

var routes = (Car) => {

    var carRouter = express.Router();
    var carController = require('../controllers/carController')(Car);
    //console.log(bookRouter.route);
    carRouter.use('/id/:id', carController.findByIdInterceptor);

    carRouter.route('/')
        .get(carController.getAll)
        .post(carController.post);

    carRouter.route('/id/:id')
        .get(carController.findById)
        .put(carController.update)
        .patch(carController.patch)
        .delete(carController.remove);

    return carRouter;
}

module.exports = routes;