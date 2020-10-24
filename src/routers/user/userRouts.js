const express = require('express');
const app = express();
const userLogin = require('./user.login');
const userProfile = require('./user.profile');
const userLogout = require('./user.logout');

app.use(userProfile);
app.use(userLogout);
app.use(userLogin);

module.exports = app;