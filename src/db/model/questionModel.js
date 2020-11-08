const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bank = require('./bankModel');
const bank = new Bank();

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
    const qType = question.type.toLocaleLowerCase();
    if (!qType) throw new Error('type must be valid thing');
    if (question.public) {
        try {
            bank[qType] = bank[qType].concat({ q: question._id });
            await bank.save();
        } catch (e) {
            console.log(e);
            throw new Error('some thing wrong');
        }

    }
    next();

});
const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;