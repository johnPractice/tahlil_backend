const rout = require('express').Router();
const auth = require('../../middelware/auth');
const Question = require('../../db/model/questionModel');
rout.get('/', auth, async(req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 1, } = req.query;
        const questions = await Question.findByOwner({ owner: user._id, page, limit });
        // // get total documents in the Posts collection 
        const count = await Question.find({ owner: user._id }).countDocuments();
        // return response with posts, total pages, and current page
        res.json({
            'questions': questions,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (e) {
        if (e.message) {
            res.status(400).json({ "error": e.message });
            return;
        }
        // console.log(e);
        res.status(400).json({ "error": e });
    }
});

module.exports = rout;