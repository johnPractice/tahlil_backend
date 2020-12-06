const express = require('express');
const examCreate = require('./exam.create');
const examGet = require('./exam.get');
const examDelete = require('./exam.delete');
const examUpdate = require('./exam.update');
const addMemeber = require('./exam.addUser');
const editMemeber = require('./exam.editUser');
const examQuestions = require('./exam.questions');
const examAnswer = require('./uploadFilwAnswerExam');



const app = express();
app.use('/', examCreate);
app.use('/', examGet);
app.use('/', examDelete);
app.use('/', examUpdate);
app.use('/', addMemeber);
app.use('/', editMemeber);
app.use('/', examQuestions);
app.use('/', examAnswer);

module.exports = app;