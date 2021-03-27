const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_examSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'کاربر باید مقدار معتبری باشد']
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: [true, 'ازمون باید مقدار معتبری داشته باشد']
    },
    answers: [{
        questionIndex: {
            type: Number,
        },
        answerText: {
            type: String,
            default: null
        },
        answerFile: {
            type: String,
            default: null
        },
        answerGrade: {
            type: Number,
            default: null,
        }
    }],
    totalGrade: {
        type: Number,
        default: null
    },
    isAutoGraded: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date,
        required: [true, 'زمان شروع آزمون مقدار معتبری یاید داشته باشد'],
        default: Date.now
    }
    //TODO: at pre save we should handel it
    // TODO: check min (starttime+examLength or endDate-startTime)
});

user_examSchema.virtual('endTime').get(async function() {
    if (!this.startTime)
        return this.startTime;

    await this.populate('exam', 'examLength endDate').execPopulate();

    const endTime =
        new Date(this.startTime.getTime() + this.exam.examLength * 60000);

    if (endTime <= this.exam.endDate)
        return endTime;
    return this.exam.endDate;
});

//methods
user_examSchema.methods.getQuestionObj = async function (questionIndex) {
    await this.populate('exam', 'questions').execPopulate();
    return this.exam.questions.find(obj => obj.index == questionIndex);
};
user_examSchema.methods.getQuestionsWithUserAnswers = async function(options) {
    await this.populate('exam', 'questions').execPopulate();
    if (options && options.getFullQuestions === true)
        var selectProperties = undefined;
    else {
        var selectProperties = "question imageQuestion type options";
        if (options && options.getQuestionAnswers === true)
            selectProperties += " answers imageAnswer";
    }
    const questions = this.exam.getQuestions(selectProperties);

    this.answers.forEach(answer => {
        let questionObj = questions.find(obj => obj.index == answer.questionIndex);
        questionObj.answerText = answer.answerText;
        questionObj.answerFile = answer.answerFile;
        if (options && options.getQuestionAnswers === true)
            questionObj.answerGrade = answer.answerGrade;
    });

    return questions;
    /* returnSchema:[{
     *      index,
     *      question,
     *      grade,
     *      answerText,   (can be undefined)
     *      answerFile    (can be undefined)
     * }]
     */
};
user_examSchema.methods.setAnswerGrade = function (questionIndex, answerGrade) {
    const user_exam = this;
    const answerObj = user_exam.answers.find(obj => obj.questionIndex == questionIndex);

    if (!answerObj)
        user_exam.answers.push({ questionIndex, answerGrade });
    else
        answerObj.answerGrade = answerGrade;
};
user_examSchema.methods.getAnswerGrade = function (questionIndex) {
    const answerObj = this.answers.find(obj => obj.questionIndex == questionIndex);
    if (!answerObj)
        return undefined
    return answerObj.answerGrade;
}
user_examSchema.methods.autoGrade = async function (options) {
    //sets grade for questions that their answerGrade is null
    //doesn't change other grades and total grade except when reAutoGrade is true
    await this.populate('exam', 'questions').execPopulate();
    const questions = this.exam.getQuestions();

    let totalGrade = 0;
    await this.answers.forEach(answerObj => {
        if (!(options && options.reAutoGrade === true) && answerObj.answerGrade !== null) {
            //already graded automatically or manually
            totalGrade += answerObj.answerGrade;

        } else {
            let { question, grade } =
                questions.find(questionObj => questionObj.index == answerObj.questionIndex);
            let correctness = question.checkAnswer(answerObj.answerText);
            if (correctness !== null)
                answerObj.answerGrade = correctness * grade;

            totalGrade += answerObj.answerGrade;
        }
    });
    if (this.totalGrade === null || (options && options.reAutoGrade === true))
        this.totalGrade = totalGrade.toFixed(2);
    this.isAutoGraded = true;
    await this.save();
};

user_examSchema.methods.toJSON = function() {
    const userExamObject = this.toObject();
    delete userExamObject.createdAt;
    delete userExamObject.updatedAt;
    delete userExamObject._id;
    delete userExamObject.__v;
    delete userExamObject.exam;
    if (this.populated('user'))
        userExamObject.user = this.user.toJSON();
    else delete userExamObject.user;
        
    return userExamObject;

};

const user_examModel = mongoose.model('UserExam', user_examSchema);
module.exports = user_examModel;