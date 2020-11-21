const rout = require('express').Router();
const Bank = require('../../db/model/bankModel');
const auth = require('../../middelware/auth');
rout.post('/', auth, async(req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 1, } = req.query;
        const { type = [], course = [], hardness = [], base = [], chapter = [] } = req.body;
        let finalSearch = [];

        if (type && type.length > 0) {
            if (finalSearch.length > 0) {
                finalSearch.forEach(item => {
                    type.forEach(t => {
                        if (!item.type)
                            item.type = t;
                        else if (item.type) {
                            const newObject = Object.assign({}, item);
                            newObject.type = t;
                            finalSearch.push(newObject);
                        }
                    });
                });
            } else {
                type.forEach(t => {
                    const newObject = {};
                    newObject.type = t;
                    finalSearch.push(newObject);
                });

            }
        }
        if (course && course.length > 0) {
            if (finalSearch.length > 0) {
                finalSearch.forEach(item => {
                    course.forEach(c => {
                        if (!item.course)
                            item.course = c;
                        else if (item.course) {
                            const newObject = Object.assign({}, item);
                            newObject.course = c;
                            finalSearch.push(newObject);
                        }
                    });
                });
            } else {
                course.forEach(c => {
                    const newObject = {};
                    newObject.course = c;
                    finalSearch.push(newObject);
                });

            }
        }
        if (hardness && hardness.length > 0) {
            if (finalSearch.length > 0) {
                finalSearch.forEach(item => {
                    hardness.forEach(h => {
                        if (!item.hardness)
                            item.hardness = h;
                        else if (item.hardness) {
                            const newObject = Object.assign({}, item);
                            newObject.hardness = h;
                            finalSearch.push(newObject);
                        }
                    });
                });
            } else {
                hardness.forEach(h => {
                    const newObject = {};
                    newObject.hardness = h;
                    finalSearch.push(newObject);
                });

            }
        }
        if (base && base.length > 0) {
            if (finalSearch.length > 0) {
                finalSearch.forEach(item => {
                    base.forEach(b => {
                        if (!item.base)
                            item.base = b;
                        else if (item.base) {
                            const newObject = Object.assign({}, item);
                            newObject.base = b;
                            finalSearch.push(newObject);
                        }
                    });
                });
            } else {
                base.forEach(b => {
                    const newObject = {};
                    newObject.base = b;
                    finalSearch.push(newObject);
                });

            }
        }
        if (chapter && chapter.length > 0) {
            if (finalSearch.length > 0) {
                finalSearch.forEach(item => {
                    chapter.forEach(c => {
                        if (!item.chapter)
                            item.chapter = c;
                        else if (item.chapter) {
                            const newObject = Object.assign({}, item);
                            newObject.chapter = c;
                            finalSearch.push(newObject);
                        }
                    });
                });
            } else {
                chapter.forEach(c => {
                    const newObject = {};
                    newObject.chapter = c;
                    finalSearch.push(newObject);
                });

            }
        }
        if (finalSearch.length == 0) {
            const bank = await Bank.find({ owner: { $ne: user._id } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            if (!bank || bank.length == 0) {
                res.json({ 'message': 'nothing found' });
                return;
            }

            // // get total documents in the Posts collection 
            const count = await Bank.countDocuments();

            // return response with posts, total pages, and current page
            res.json({
                'questions': bank,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
            return;
        } else {
            const bank = await Bank.find({ $or: finalSearch, owner: { $ne: user._id } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            if (!bank || bank.length == 0) {
                res.json({ 'message': 'nothing found' });
                return;
            }

            // // get total documents in the Posts collection 
            const count = await Bank.find({ $or: finalSearch, owner: { $ne: user._id } }).countDocuments();

            // return response with posts, total pages, and current page
            res.json({
                'questions': bank,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
            return;
        }


    } catch (e) {
        // console.log(e);
        res.status(400).json(e.message);

    }

});
module.exports = rout;