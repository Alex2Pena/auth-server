'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

// Remember to ask why this gies first, hook?
mongoose.connect(MONGODB_URI, mongoOptions);

require('./src/app.js').start(process.env.PORT);