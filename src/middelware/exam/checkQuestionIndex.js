const questionModel = require("../../db/model/questionModel");

const checkQuestionIndex = async (req, res, next) => {
    try {
        const { exam } = req;
        const { questionIndex } = req.params;

        if (!questionIndex)
            throw { message: "Invalid questionId", code: 400 };

        if (exam) {
            const foundObj = exam.questions.find(obj => obj.index == questionIndex);
            if (!foundObj)
                throw { message: "Question and Exam don't match", code: 400 };

            req.questionObj = foundObj;
        }
        next();
    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 503;
        res.status(err.code).json({ error: err.message });
    }
};
module.exports = checkQuestionIndex;