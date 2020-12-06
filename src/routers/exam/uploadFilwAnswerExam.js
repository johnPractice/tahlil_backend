const rout = require('express').Router();
const auth = require('../../middelware/auth');
const uploadAnswer = require('../../middelware/exam/fileUploadingExam');
rout.post('/answer', auth, uploadAnswer.single('answer'), async(req, res) => {
    try {
        const filePath = (req.fileName);
        // TODO: check exam and question to save answer path
        if (!filePath) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        }
        res.status(200).json({ "message": "ok", filePath });
    } catch (e) {
        res.json(e);
    }
});
module.exports = rout;