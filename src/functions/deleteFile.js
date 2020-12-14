const fs = require('fs');
const deleteFile = (pathFile) => {
    pathFile = pathFile.split("//").join("/");
    fs.stat(pathFile, function(err, stats) {
        if (err) throw new Error(err);
        fs.unlink(pathFile, function(err) {
            if (err) throw new Error(err);
            return true;
        });
    });
};
module.exports = deleteFile;