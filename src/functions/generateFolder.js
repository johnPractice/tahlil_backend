const fs = require("fs");
const checkFolder = async(path) => {
    if (!await fs.existsSync(path)) await fs.mkdirSync(path);
};
module.exports = checkFolder;