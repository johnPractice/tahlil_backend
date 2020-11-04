const express = require('express');
const app = express();
const createClass = require('./createClass');
const searchClass = require('./searchClass');
const classJoin = require('./classJoin');
const classLeave = require('./classLeave');

app.use('/', createClass);
app.use('/', searchClass);
app.use('/', classJoin);
app.use('/', classLeave);


module.exports = app;