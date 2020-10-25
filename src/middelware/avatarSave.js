const multer = require('multer');
const avatarStorage = require('../functions/multer.avatar');
const avatarSave = multer({
    storage: avatarStorage
});

module.exports = avatarSave;