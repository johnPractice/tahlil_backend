const express = require('express');
const createQuestion = require('./create.quesion');
const editQuestion = require('./edit.qestion');

const app = express();

app.use('/', createQuestion);
app.use('/', editQuestion);


module.exports = app;