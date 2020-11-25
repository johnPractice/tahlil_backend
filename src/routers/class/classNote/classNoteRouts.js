const express = require('express');
const classNoteApp = express();
const createClassNote = require('./createClassNote');
const editClassNote = require('./editClassNote');
const deleteClassNote = require('./deleteClassNote');
const getClassNote = require('./getClassNote');

classNoteApp.use('/', createClassNote);
classNoteApp.use('/', editClassNote);
classNoteApp.use('/', deleteClassNote);
classNoteApp.use('/', getClassNote);

module.exports = classNoteApp;