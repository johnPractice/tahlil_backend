// for add avatar image 
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const avatarStorage = multer.diskStorage({
    destination: async function(req, file, cb) {
        if (!fs.existsSync('public/'))
            fs.mkdirSync('public/');
        if (!fs.existsSync('public/uploads'))
            fs.mkdirSync('public/uploads/');
        if (!fs.existsSync('public/uploads/avatar'))
            fs.mkdirSync('public/uploads/avatar');
        cb(null, 'public/uploads/avatar');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 'avatar' + req.user._id.toString() + path.extname(file.originalname));

    }
});

module.exports = avatarStorage;