'use strict';

const basicAuth = require('./middleware/basic-auth-middleware.js');
const users = require('./auth/users-model.js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//middleware routes
const router = require('./auth/routes.js');
const extraRoutes = require('./auth/additional-routes.js')

const app = express();
app.use(cors());
app.use(morgan('dev'));

// will parse the req body on post and put request
app.use(express.json());
app.use(router);
app.use(extraRoutes);
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));


module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log(`server up: ${port}`));
  }
};