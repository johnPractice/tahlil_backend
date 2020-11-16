const rout = require('express').Router();
const Bank = require('../../db/model/bankModel');
const auth = require('../../middelware/auth');
rout.post('/', auth, async(req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 1, } = req.query;
        const search = req.body;
        let finalSearch = [];
        if (search.type && search.type.length > 0) {
            search.type.forEach(type => {
                const newObject = {};
                newObject.type = type;
                finalSearch.push(newObject);
            });
        }
        if (search.course && search.course.length > 0) {
            search.course.forEach(course => {
                const newObject = {};
                newObject.course = course;
                finalSearch.push(newObject);
            });
        }
        if (search.hardness && search.hardness.length > 0) {
            search.hardness.forEach(hardness => {
                const newObject = {};
                newObject.hardness = hardness;
                finalSearch.push(newObject);
            });
        }
        if (search.base && search.base.length > 0) {
            search.base.forEach(base => {
                const newObject = {};
                newObject.base = base;
                finalSearch.push(newObject);
            });
        }
        if (search.chapter && search.chapter.length > 0) {
            search.chapter.forEach(chapter => {
                const newObject = {};
                newObject.chapter = chapter;
                finalSearch.push(newObject);
            });
        }
        if (finalSearch == [] || Object.keys(search).length == 0) {
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
            const bank = await Bank.find({ $and: finalSearch, owner: { $ne: user._id } })
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