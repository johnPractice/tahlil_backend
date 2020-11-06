const express = require('express');
const createQuestion = require('./create.quesion');
const app = express();

app.use('/', createQuestion);

module.exports = app;