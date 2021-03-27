const express = require('express');
const app = express();
const questionCategory = require('./questionCategory');
const time = require('./getTime');
const downloadApp = require('./downloadApp');
app.use('/', questionCategory);
app.use('/', time);
app.use('/', downloadApp);
module.exports = app;