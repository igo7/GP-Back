var carController = (Car) => {
    return {
        findByIdInterceptor: (req, res, next) => {
            Car.findById(req.params.id, (err, resp) => {
                console.log('from intereptor...');
                if (err) {
                    res.status(500).send(err);
                } else if (resp) {
                    req.car = resp;
                    next();
                } else {
                    res.status(404).send(err);
                }
            })
        },
        post: (req, res) => {
            Car.create(req.body, (err, resp) => {
                if (err) {
                    console.log('err', err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send(resp);
                }
            })
        },
        getAll: (req, res) => {
            Car.find((err, resp) => {
                if (err) {
                    console.log('err', err);
                } else {
                    res.json(resp);
                }
            });
        },
        findById: (req, res) => {
            console.log('req.car', req.car);
            res.json(req.car);
        },
        patch: (req, res) => {
            let newCar = Object.assign(req.car, req.body);
            console.log('newCar', newCar);
            Car.update(newCar, (err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newCar);
                }
            });
        },
        update: (req, res) => {
            console.log('req.car', req.car.model);
            delete req.car._id;
            //let newBook = Object.assign(req.book, req.body);
            let newCar = {
                make:req.body.make || "no make",
                model:req.body.title || "no title",
                salvage:req.body.salvage || true,
                price:req.body.price || "0.00"
            }
            console.log('newCar', newCar);
            Car.update(newCar, (err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newCar);
                }
            });
        },
        remove: (req, res) => {
            req.car.remove((err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({ message: 'Delete Success!' });
                }
            });
        }
    }
}

module.exports = carController;