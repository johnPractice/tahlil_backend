const fs = require('fs');
const existPath = async(paths) => {
    try {
        let add = '.';
        paths.forEach(async(path) => {
            add = add + '/' + path;
            if (!fs.existsSync(add))
                await fs.mkdirSync(add);
        });
        return add;
    } catch (e) {
        console.log(e);
        return false;
    }

};

module.exports = existPath;