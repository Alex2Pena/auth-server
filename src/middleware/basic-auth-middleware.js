'use strict';

const base64 = require('base-64');
const Users = require('../auth/users-model.js');

module.exports = (req, res, next) => {
  // checking if the request contains auth headers - if not, tell the user they need to login with proper cred
  if (!req.headers.authorization) { next('invalid login details') };


  // the username:pw examples below are not real base64
  // req.headers.authorization = 'Basic foisfo39:390u2034' // ['Basic', 'foisfo39:390u2034']
  let basic = req.headers.authorization.split(' ').pop();

  // this is our base64 username and pw -> foisfo39:390u2034
  let [user, pass] = base64.decode(basic).split(':');

  Users.authenticateBasic(user, pass)
    .then(validUser => {
      console.log('validUser:', validUser);
      req.token = Users.generateToken(validUser);
      next();
    })
    .catch(err => {
      console.log(err); 
      next('invalid login details');
      });
}