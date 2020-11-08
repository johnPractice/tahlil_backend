const express = require('express');
const app = express();
const createClass = require('./createClass');
const searchClass = require('./searchClass');
const classJoin = require('./classJoin');
const classLeave = require('./classLeave');
const classDelete = require('./classDelete');
const classEdit = require('./classEdit');

app.use('/', createClass);
app.use('/', searchClass);
app.use('/', classJoin);
app.use('/', classLeave);
app.use('/', classDelete);
app.use('/', classEdit);


module.exports = app;