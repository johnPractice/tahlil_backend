const express = require('express');
const app = express();
const questionCategory = require('./questionCategory');
app.use('/', questionCategory);
module.exports = app;