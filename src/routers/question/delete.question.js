const rout = require('express').Router();
const Question = require('../../db/model/questionModel');
const auth = require('../../middelware/auth');
rout.delete('/', auth, async(req, res) => {
    try {
        const info = req.body;
        const user = req.user;
        const question = await Question.findAndOwner({ qId: info.questionId, owner: user._id.toString() });

        await question.delete();
        res.json({ 'meesage': 'question deleted' });
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