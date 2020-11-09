const rout = require('express').Router();
const Bank = require('../../db/model/bankModel');
const auth = require('../../middelware/auth');
rout.post('/', auth, async(req, res) => {
    try {
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
            search.type.forEach(course => {
                const newObject = {};
                newObject.course = course;
                finalSearch.push(newObject);
            });
        }
        if (search.hardness && search.hardness.length > 0) {
            search.type.forEach(hardness => {
                const newObject = {};
                newObject.hardness = hardness;
                finalSearch.push(newObject);
            });
        }
        if (search.base && search.base.length > 0) {
            search.type.forEach(base => {
                const newObject = {};
                newObject.base = base;
                finalSearch.push(newObject);
            });
        }
        if (finalSearch == [] || Object.keys(search).length == 0) {
            const bank = await Bank.find()
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
            const bank = await Bank.find({ $or: finalSearch })
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
        }


    } catch (e) {
        // console.log(e);
        res.status(400).json(e.message);

    }

});
module.exports = rout;