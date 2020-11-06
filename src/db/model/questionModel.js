const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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





const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;