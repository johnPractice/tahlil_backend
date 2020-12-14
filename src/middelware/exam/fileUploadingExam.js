const multer = require('multer');
const path = require('path');
const { baseRoot } = require('../../../constants');
const checkFolder = require('../../functions/generateFolder');
const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        await checkFolder(baseRoot + '/uploads');
        cb(null, baseRoot + '/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: async function(req, file, cb) {
        if (!req.params.questionIndex || !req.user_exam._id) {
            cb(null, false);
            return cb(new Error('some fileds missed!'));
        }
        const fileName = await req.user_exam._id + '-' + file.fieldname + '-' + req.params.questionIndex + await path.extname(file.originalname);
        req.fileName = baseRoot + '/uploads/' + fileName;
        cb(null, fileName);
    }
});
const uploadAnswer = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "application/zip") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg  .pdf and .zip'));
        }
    }
});
module.exports = uploadAnswer;