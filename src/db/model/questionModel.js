const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER']
    },
    public: {
        type: Boolean,
        default: false
    },
});





const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;