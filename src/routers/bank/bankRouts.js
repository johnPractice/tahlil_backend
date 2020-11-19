const express = require('express');
const app = express();
const getQuestion = require('./getQuestion');
app.use('/', getQuestion);
module.exports = app;