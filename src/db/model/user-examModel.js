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
            type: Number
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
            default: null
        }
    }],
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

    //not sure if it ((always)) works!
    const endTime =
        new Date(this.startTime.getTime() + this.exam.examLength * 60000);

    if (endTime <= this.exam.endDate)
        return endTime;
    return this.exam.endDate;
});

//methods
user_examSchema.methods.getQuestionsWithUserAnswers = async function(options) {
    await this.populate('exam', 'questions').execPopulate();
    let selectProperties = "question imageQuestion type options";
    if (options && options.getQuestionAnswers === true)
        selectProperties += " answers imageAnswer";
    const questions = this.exam.getQuestions(selectProperties);

    this.answers.forEach(answer => {
        let questionObj = questions.find(obj => obj.index == answer.questionIndex);
        questionObj.answerText = answer.answerText;
        questionObj.answerFile = answer.answerFile;
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