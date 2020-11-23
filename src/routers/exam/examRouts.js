const express = require('express');
const examCreate = require('./exam.create');
const examGet = require('./exam.get');
const examDelete = require('./exam.delete');
const examUpdate = require('./exam.update');

const app = express();
app.use('/', examCreate);
app.use('/', examGet);
app.use('/', examDelete);
app.use('/', examUpdate);


module.exports = app;