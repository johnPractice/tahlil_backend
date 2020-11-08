//     'TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bankSchema = Schema({
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
    qId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});


const bankModel = mongoose.model('Bank', bankSchema);
module.exports = bankModel;