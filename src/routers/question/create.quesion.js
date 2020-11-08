const rout = require('express').Router();
const Question = require('../../db/model/questionModel');
const auth = require('../../middelware/auth');


rout.post('/create', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        const canUses = ['type', 'public', 'question', 'answer', 'options', 'hardness', 'base', 'course'];
        if (Object.keys(info).length == 0) {
            res.status(400).json({ "error": "must enter somthnig" });
            return;
        }
        const question = new Question();
        canUses.forEach(cansUse => {
            if (info[cansUse]) question[cansUse] = info[cansUse];
        });
        question.owner = user._id;
        await question.save();
        res.status(200).json({ 'message': 'question added' });
    } catch (e) {
        console.log(e);
        if (e.message) {
            res.status(400).json(e.message);
        } else { res.status(400).json(e); }
    }
});

module.exports = rout;