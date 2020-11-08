//     'TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bankSchema = Schema({
    test: [{
        q: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }],
    multichoise: [{
        q: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }],
    longanswer: [{
        q: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }],
    shortanswer: [{
        q: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }],

});


const bankModel = mongoose.model('Bank', bankSchema);
module.exports = bankModel;