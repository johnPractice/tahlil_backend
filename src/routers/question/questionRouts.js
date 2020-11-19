const express = require('express');
const createQuestion = require('./create.quesion');
const editQuestion = require('./edit.qestion');
const deleteQuestion = require('./delete.question');
const listQuestion = require('./question.user');



const app = express();

app.use('/', createQuestion);
app.use('/', editQuestion);
app.use('/', deleteQuestion);
app.use('/', listQuestion);




module.exports = app;