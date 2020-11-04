const express = require('express');
const app = express();
const createClass = require('./createClass');
const searchClass = require('./searchClass');

app.use('/', createClass);
app.use('/', searchClass);


module.exports = app;