const rout = require('express').Router();
const Question = require('../../db/model/questionModel');
const auth = require('../../middelware/auth');
const checkAnswer = require('../../middelware/question/checkAnswer');

rout.put('/', auth, checkAnswer, async(req, res) => {
    try {
        const info = req.body;
        const user = req.user;
        const question = await Question.findAndOwner({ qId: info.questionId, owner: user._id.toString() });
        const canUses = ['type', 'public', 'question', 'answers', 'options', 'hardness', 'base', 'course', 'chapter'];
        canUses.forEach(use => {
            if (info[use])
                question[use] = info[use];
        });
        await question.save();
        res.json({ 'meesage': 'question updated', question });
    } catch (e) {
        if (e.message) {
            res.status(400).json({ 'error': e.message });
            return;
        } else {
            // console.log(e);
            res.status(400).json({ 'error': e });
        }
    }
});
module.exports = rout;