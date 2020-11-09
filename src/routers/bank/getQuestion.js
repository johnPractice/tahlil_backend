const rout = require('express').Router();
const Bank = require('../../db/model/bankModel');
const auth = require('../../middelware/auth');
rout.get('/', auth, async(req, res) => {
    try {
        const { page = 1, limit = 1, } = req.query;
        const canUsesTypes = ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER'];
        const canUsesCourse = ['MATH', 'PHYSIC', 'CHEMISTRY', 'BIOLOGY'];
        const canUsesHardnes = ['LOW', 'MEDIUM', 'HARD'];
        const userBases = ['10', '11', '12'];

        let finalSearch = [];
        canUsesTypes.forEach(use => {
            if (req.query[use] == 'true' || req.query[use] == true) finalSearch.push(use);
        });
        canUsesCourse.forEach(use => {
            if (req.query[use] == 'true' || req.query[use] == true) finalSearch.push(use);
        });
        canUsesHardnes.forEach(use => {
            if (req.query[use] == 'true' || req.query[use] == true) finalSearch.push(use);
        });
        userBases.forEach(use => {
            if (req.query[use] == 'true' || req.query[use] == true) finalSearch.push(use);
        });
        // execute query with page and limit values
        const bank = await Bank.find().where('type').in(finalSearch)
            .where('hardness').in(finalSearch)
            .where('course').in(finalSearch)
            .where('base').in(finalSearch)

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
        res.json();

    } catch (e) {
        // console.log(e);
        res.status(400).json(e.message);

    }

});
module.exports = rout;