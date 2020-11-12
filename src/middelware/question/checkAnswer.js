const checkAnswer = async(req, res, next) => {
    const answer = req.body.answers;
    const info = req.body;
    try {
        if (info.type == 'TEST' && (!answer || answer.length > 1)) throw new Error('in test question can selected 1 option');
        else if (info.type == 'MULTICHOISE' && (!answer || !answer.length || answer.length == 0)) throw new Error('in multi choise  question  can selected more 1 option');
        else if ((info.type == 'LONGANSWER' || info.type == 'SHORTANSWER')) {
            if (answer && typeof(answer[0].answer) != 'string') throw new Error('in long or short question , answer must be valid thing');
            else if (!answer) {
                next();
                return;
            }
        }
        next();
    } catch (e) {
        console.error(e);
        if (e.message) {
            res.status(400).json(e.message);
        } else { res.status(400).json(e); }
    }
};
module.exports = checkAnswer;