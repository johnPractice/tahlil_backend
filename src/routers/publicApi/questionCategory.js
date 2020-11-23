const rout = require('express').Router();
rout.get('/question/category', (req, res) => {
    res.json({
        type: {
            'TEST': 'تست',
            'MULTICHOISE': 'چند گزینه ای',
            'LONGANSWER': 'تشریحی',
            'SHORTANSWER': 'پاسخ کوتاه'
        },
        base: {
            '10': 'دهم',
            '11': 'یازدهم',
            '12': 'دوازدهم'
        },
        course: {
            'MATH': 'ریاضی',
            'PHYSIC': 'فیزیک',
            'CHEMISTRY': 'شیمی',
            'BIOLOGY': 'زیست'
        },
        hardness: {
            'LOW': 'آسان',
            'MEDIUM': 'متوسط',
            'HARD': 'سخت'
        },
        chapter: {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10'
        }

    });
});
module.exports = rout;