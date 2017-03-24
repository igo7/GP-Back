var bookController = (Book) => {

    var post = (req, res) => {
        Book.create(req.body, (err, resp) => {
            if (err) {
                console.log('err', err);
                res.status(500).send(err);
            } else {
                res.status(201).send(resp);
            }
        })
    },
        getAll = (req, res) => {
            Book.find((err, resp) => {
                if (err) {
                    console.log('err', err);
                } else {
                    res.json(resp);
                }
            });
        },
        findById = (req, res) => {
            console.log('req.book', req.book);
            res.json(req.book);
        },
        update = (req, res) => {
            let newBook = Object.assign(req.book, req.body);
            console.log('newBook', newBook);
            Book.update(newBook, (err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newBook);
                }
            });
        },
        patch = (req, res) => {
            let newBook = Object.assign(req.book, req.body);
            console.log('newBook', newBook);
            Book.update(newBook, (err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newBook);
                }
            });
        },
        remove = (req, res) => {
            req.book.remove((err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send({ message: 'delete success' });
                }
            });
        }

    return {
        post: post,
        getAll: getAll,
        findById: findById,
        patch: patch,
        update: update,
        remove: remove
    }





}

module.exports = bookController;