const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bank = require('./bankModel');
const questionSchema = Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    imageQuestion: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true,
        enum: ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER'],
    },
    base: {
        type: String,
        enum: ['10', '11', '12'],
        required: true,
    },
    course: {
        type: String,
        required: true,
        enum: ['MATH', 'PHYSIC', 'CHEMISTRY', 'BIOLOGY']
    },
    chapter: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    hardness: {
        type: String,
        required: true,
        enum: ['LOW', 'MEDIUM', 'HARD']
    },
    answers: [{
        answer: {}
    }],
    imageAnswer: {
        type: String,
        default: null
    },
    options: [{
        option: { type: String }
    }],
    public: {
        type: Boolean,
        default: false
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});




// methode
questionSchema.pre('save', async function (next) {
    const question = this;
    if (question.isModified('type') || question.isModified('answers') || question.isModified('options'))
        question.validateFields();
    // for update question  
    const checkBank = Bank.findOne({ qId: question._id });
    if (checkBank) {
        await checkBank.remove();
    }
    if (question.isModified('imageQuestion') || question.isModified('imageAnswer')) {
        const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const tests = ['imageAnswer', 'imageQuestion'];
        for (let i = 0; i < tests.length; i++) {
            if (question[tests[i]] != null) {
                if (!base64regex.test(question[tests[i]])) throw new Error("it's not base64 format");
            }
        }
    }
    if (!question.hardness) throw new Error('hardness must be valid thing');
    if (question.isModified('type')) {
        if (question.type == 'TEST' || question.type == 'MULTICHOISE') {
            if (question.type == "TEST") {
                if (question.options.length != 4) throw new Error("test question must have 4 options");
                if (question.type == "MULTICHOISE" && question.options.length < 2) throw new Error("multi choise question must have atleas 2 option");
            }
        }
    }
    if (question.public) {
        const bank = new Bank({ question: question.question, type: question.type, qId: question._id, hardness: question.hardness, course: question.course, base: question.base, chapter: question.chapter, owner: question.owner, imageQuestion: question.imageQuestion, imageAnswer: question.imageAnswer });
        if (question.answers) {
            bank.answers = question.answers;
            if (question.type == 'TEST' || question.type == 'MULTICHOISE') {
                bank.options = question.options;
            }
        }
        await bank.save();
    }
    next();
});
questionSchema.methods.validateFields = function () {
    const { answers, options, type } = this;
    let answer = "";
    if (type == 'TEST') {

        if (!options || options.length != 4)
            throw { message: "TEST questions must have 4 options", code: 400 };
        if (!answers || answers.length != 1)
            throw { message: "TEST questions must have one answer", code: 400 };
        answer = answers[0].answer;

    } else if (type == 'MULTICHOISE') {

        if (!options || options.length < 2)
            throw { message: "MULTICHOISE questions must have at least 2 options", code: 400 };
        if (!answers || answers.length > options.length)
            throw { message: "MULTICHOISE invalid answers", code: 400 };
        answers.forEach(obj => answer += obj.answer);

    } else if (type == 'LONGANSWER' || question.type == 'SHORTANSWER') {

        this.options = undefined;
        if (answers) {
            if (answers.length != 1)
                throw { message: "LONGANSWER & SHORTANSWER questions must have one answer", code: 400 };
            answer = answers[0].answer;
        }
    }
    
    questionModel.validateAnswer({ answer, questionType: type, questionOptionsLength: options.length });
    return true;
};
questionSchema.statics.validateAnswer = ({ answer, questionType, questionOptionsLength }) => {
    let ans = JSON.parse(JSON.stringify(answer));
    if (questionType == 'LONGANSWER' || questionType == 'SHORTANSWER') {

        if (typeof ans != 'string')
            throw { message: "LONGANSWER & SHORTANSWER questions accept only string answers", code: 400 };

    } else if (questionType == 'TEST') {

        ans = parseInt(ans);
        if (isNaN(ans))
            throw { message: "Answer for TEST questions must be an integer", code: 400 };
        if (ans > questionOptionsLength || ans <= 0)
            throw { message: "Answer is an invalid number", code: 400 };

    } else if (questionType == 'MULTICHOISE') {

        if(!Array.isArray(ans) && typeof ans == 'string')
            var answers = ans.split(',');
        if (answers.length > questionOptionsLength)
            throw { message: "Answer length is more than options length", code: 400 };
        answers = answers.map(answer => {
            let parsed = parseInt(answer);
            if (isNaN(parsed))
                throw { message: "Answer for MULTICHOISE questions must be an integer", code: 400 };
            if (parsed > questionOptionsLength || parsed <= 0)
                throw { message: "Answer is an invalid number", code: 400 };
            return parsed;
        });
    }
    return ans;
};
// methode for after delete ==>delete from Bank
questionSchema.pre('remove', async function(next) {
    const bank = await Bank.findOne({ qId: this._id });
    if (bank) {
        bank.deleted = true;
        await bank.save();
    }
    next();
});
// methode for find and chec the owner
questionSchema.statics.findAndOwner = async function({ qId, owner }) {
    if (!qId || !owner) throw new Error('questionId and ower must be valid thing');
    const question = await questionModel.findOne({ _id: qId });
    if (!question) throw new Error('nothing found');
    if (owner != question.owner.toString()) throw new Error('just author can edit question');
    return question;
};
questionSchema.statics.findByOwner = async function({ owner, page = 1, limit = 1 }) {
    if (!owner) throw new Error('ower must be valid thing');
    const question = await questionModel.find({ owner })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    if (!question /* || !question.length > 0*/ ) throw new Error('nothing found');
    return question;
};

//to json methode
questionSchema.methods.toJSON = function() {
    const questionObject = this.toObject();
    delete questionObject.createdAt;
    delete questionObject.updatedAt;
    delete questionObject.__v;
    delete questionObject.owner;
    if (questionObject.answers && questionObject.answers.length > 0) {
        questionObject.answers.forEach(item => {
            delete item._id;
        });
    }
    if (questionObject.options.length > 0) {
        questionObject.options.forEach(item => {
            delete item._id;
        });
    }
    questionObject._id = questionObject._id.toString();
    return questionObject;
};

const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;