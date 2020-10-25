const express = require('express');
const app = express();
const userLogin = require('./user.login');
const userProfile = require('./user.profile');
const userLogout = require('./user.logout');
const userDelete = require('./user.delete');

app.use(userProfile);
app.use(userLogout);
app.use(userLogin);
app.use(userDelete);

module.exports = app;