const express = require('express');
const app = express();
const createClass = require('./createClass');
app.use('/', createClass);

module.exports = app;