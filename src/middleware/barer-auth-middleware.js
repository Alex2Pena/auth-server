'use strict';

const Users = require('../auth/users-model.js');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {next('invalid login attempt')};
    //  EXAMPLE req.headers.authorization = 'Bearer 0-89vfjr0v0rfntoken'
    let token = req.headers.authorization.split(' ').pop();
// console.log('I am a user', Users);
    Users.authenticateToken(token)
        .then(validUser => {
            req.user = validUser;
            next();
        })
        .catch(err => next(err));
}