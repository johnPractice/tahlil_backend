const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bank = require('./bankModel');

const questionSchema = Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER']
    },
    answer: {
        type: String,
        default: null
    },
    public: {
        type: Boolean,
        default: false
    },
});




// methode
questionSchema.pre('save', async function(next) {
    const question = this;
    if (question.public) {
        const bank = new Bank({ question: question.question, type: question.type, answer: question.answer, qId: question._id });
        await bank.save();
    }
    next();

});
const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;