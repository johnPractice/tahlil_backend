const checkAnswer = async(req, res, next) => {
    const answerString = req.body.answer;
    if (!answerString) next();
    const info = req.body;
    try {
        const answer = JSON.parse(answerString);
        if (info.type == 'TEST' && answer.length > 1) throw new Error('in test question can selected 1 option');
        else if (info.type == 'MULTICHOISE' && answer.length == 0) throw new Error('in multi choise  question  can selected more 1 option');
        else if ((info.type == 'LONGANSWER' || info.type == 'SHORTANSWER') && !typeof(answer) == 'string') throw new Error('in long or short question , answer must be valid thing');
        next();
    } catch (e) {
        console.log(e);
    }


};

module.exports = checkAnswer;