const rout = require('express').Router();
const Exam = require('../../db/model/examModel');
const auth = require('../../middelware/auth');
rout.get('/', auth, async(req, res) => {
    try {
        const test = await Exam.find().populate('questions');
        res.json(test)
    } catch (e) {
        console.log(e);
        res.json({ "error": e });
    }
});

module.exports = rout;