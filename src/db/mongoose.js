const mongoose = require('mongoose');
const constants = require('../../constants');
const dbAddress = constants.dbAddLocal;


const dbStart = function() {
    try {
        mongoose.connect(dbAddress, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = dbStart;