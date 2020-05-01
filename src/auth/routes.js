const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const oauth = require('../middleware/oauth-middleware.js');
const bearerAuth = require('../middleware/barer-auth-middleware');
const basicAuth = require('../middleware/basic-auth-middleware.js');


authRouter.post('/signup', async (req, res, next) => {

  console.log('I am the req', req.body);
  let user = new User(req.body);
  user.save()
    .then(dbUser => {
      console.log('******* I am a dbUser ******', dbUser);
      req.token = user.generateToken(dbUser);
      req.user = user;
      res.send(req.token);
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

// this is our "redirect_uri"
authRouter.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
});

authRouter.get('/bearer', bearerAuth, (req, res) => {
  res.status(200).send(req.token);
});

authRouter.get('')
module.exports = authRouter;