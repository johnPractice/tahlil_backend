const express = require('express');
const classNoteApp = express();
const createClassNote = require('./createClassNote');

classNoteApp.use('/', createClassNote);

module.exports = classNoteApp;