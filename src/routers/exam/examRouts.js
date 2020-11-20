const express = require('express');
const examCreate = require('./exam.create');
const test = require('./exam.get');

const app = express();
app.use('/', examCreate);
app.use('/', test);

module.exports = app;