const express = require('express');
const classNoteApp = express();
const createClassNote = require('./createClassNote');
const editClassNote = require('./editClassNote');

classNoteApp.use('/', createClassNote);
classNoteApp.use('/', editClassNote);

module.exports = classNoteApp;