const rout = require('express').Router();
const { baseRoot } = require('../../../constants');
rout.get('/download/app', (req, res) => {
    var filePath = baseRoot + '/download/';
    var fileName = "app-armeabi-v7a-release.apk";
    res.download((filePath + fileName), fileName, function(err) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        // console.log('download callback called');
    });

}); // pass in the path to the newly created file});
module.exports = rout;