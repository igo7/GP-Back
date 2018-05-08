var express = require('express');


var routes = function (User) {
  var userRouter = express.Router();

  userRouter.route('/')
    .post(function (req, res) {
      var user = new User(req.body);
      user.save();
      res.status(201).send(user);
    })
    .get(function (req, res) {
      var query = {};

      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      User.find(query, function (err, users) {
        if (err)
          res.status(500).send(err);
        else
          res.json(users);
      });
    });

  userRouter.use('/id/:userId', function (req, res, next) {
    User.findById(req.params.userId, function (err, user) {
      if (err)
        res.status(500).send(err);
      else if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send('no user found');
      }
    });
  });

  userRouter.route('/id/:userId')
    .get(function (req, res) {

      res.json(req.user);

    })
    .put(function (req, res) {
      req.user.username = req.body.username;
      req.user.password = req.body.password;
      req.user.Email = req.body.Email;
      req.user.save(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.json(req.user);
        }
      });
    })
    .patch(function (req, res) {
      if (req.body._id)
        delete req.body._id;

      for (var p in req.body) {
        req.user[p] = req.body[p];
      }

      req.user.save(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.json(req.user);
        }
      });
    })
    .delete(function (req, res) {
      req.user.remove(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.status(204).send('Removed');
        }
      });
    });

  userRouter.route('/login')
    .post(function (req, res) {
      var username = req.body.username;
      var password = req.body.password;

      User.find({
        username: username,
        password: password
      }, function (err, user) {
        console.log("err", err, "user", user);
        if (err) {
          res.status(500).send(err);
        } else if (user.length == 0) {
          res.status(201).send({ errorMessage: "User not found!" });
        } else {
          res.status(201).send(user);
        }
      });
    });

  return userRouter;
};

module.exports = routes;
