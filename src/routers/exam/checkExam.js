const rout = require('express').Router();
const auth = require('../../middelware/auth');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');


rout.get('/:examId/questions/status', auth, checkExamId, checkClassAccess, checkExamTime, async(req, res) => {
    try {
        const { user_exam, user_examEndTime, exam } = req;

        const answers = user_exam.answers;
        answers.sort((a, b) => a.index - b.index);
        const questionsCount = exam.questions.length;

        const status = [];
        let j = 0;
        for (let i = 1; i <= questionsCount; i++) {
            let s = {
                questionIndex: i,
                hasAnswerText: false,
                hasAnswerFile: false
            };
            let answer = answers[j];
            if (answer.questionIndex == i) {
                if (answer.answerText != null)
                    s.hasAnswerText = true;
                if (answer.answerFile != null)
                    s.hasAnswerFile = true;
                j = j + 1;
            }
            status.push(s);
        }
        res.json({ status, user_examEndTime });

    } catch (e) {
        res.json(e);
    }
});
module.exports = rout;