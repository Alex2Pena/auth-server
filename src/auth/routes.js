const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('../middleware/basic-auth-middleware.js');

authRouter.post('/signup', (req, res, next) => {
    let user = new User(req.body);
    user.save()
      .then(user => {
        req.token = user.generateToken();
        req.user = user;
        res.set('token', req.token);
        req.send(req.token);
      })
      .catch(next);
  });
  
  authRouter.post('/signin', basicAuth, (req, res) => {
    // req.token only exists because of our basic auth middleware
    res.status(200).send(req.token);
  });
  
  authRouter.get('/users', basicAuth, (req, res) => {
    res.status(200).send(users.list());
  });

  module.exports = authRouter;