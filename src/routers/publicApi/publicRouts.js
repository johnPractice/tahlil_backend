const express = require('express');
const app = express();
const questionCategory = require('./questionCategory');
const time = require('./getTime');
app.use('/', questionCategory);
app.use('/', time);
module.exports = app;