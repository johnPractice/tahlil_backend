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
    type: {
        type: String,
        required: true,
        enum: ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER'],
    },
    base: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        required: true,
    },
    hardness: {
        type: String,
        required: true,
        enum: ['LOW', 'MEDIUM', 'HARD']
    },
    answer: { type: Number },
    options: [{
        option: { type: String }
    }],
    public: {
        type: Boolean,
        default: false
    },
});




// methode
questionSchema.pre('save', async function(next) {
    const question = this;
    if (!question.hardness) throw new Error('hardness must be valid thing');
    if (question.type == 'TEST' || question.type == 'MULTICHOISE') {
        if (!question.answer || !question.options) throw new Error('for test and multi option should set answer and options');
        question.answer = parseInt(question.answer);
        if (question.options.length > 4) throw new Error('test or multi question have 4 option cant add more ');
    }
    if (question.public) {
        const bank = new Bank({ question: question.question, type: question.type, qId: question._id });
        if (question.type == 'TEST' || question.type == 'MULTICHOISE') {
            bank.options = question.options;
        }
        await bank.save();
    }
    next();
});
const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;