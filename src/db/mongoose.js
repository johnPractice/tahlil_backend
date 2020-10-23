const mongoose = require('mongoose');
const constants = require('../../constants');
const dbAddress = constants.buildMode ? constants.dbAddUrl : constants.dbAddLocal;

const dbStart = function() {
    try {
        mongoose.connect(dbAddress, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then((res) => {
            console.log('db conectd');
        }).catch(e => {
            console.log(e);
        });

    } catch (e) {
        console.error(e);
    }
};

module.exports = dbStart;