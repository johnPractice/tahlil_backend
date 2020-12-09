const questionModel = require("../../db/model/questionModel");

const checkQuestionId = async (req, res, next) => {
    try {
        const { exam } = req;
        const { questionId } = req.params;

        if (!questionId)
            throw { message: "Invalid questionId", code: 400 };

        if (exam) {
            const foundObj = exam.questions.find(obj => obj.question.equals(questionId));
            if (!foundObj)
                throw { message: "Question and Exam don't match", code: 400 };
            const question = questionModel.findById(foundObj.question);
            if (!question)
                throw { message: "Invalid questionId", code: 400 };

            req.question = question;
        }
        next();
    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
};
module.exports = checkQuestionId;