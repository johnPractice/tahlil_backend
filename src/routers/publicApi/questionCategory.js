const rout = require('express').Router();
rout.get('/question/category', (req, res) => {
    res.json({
        type: {
            'TEST': 'تست',
            'MULTICHOISE': 'چند گزینه ای',
            'LONGANSWER': 'جواب کامل',
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
            'LOW': 'آسون',
            'MEDIUM': 'متوسط',
            'HARD': 'سخت'
        },
        chapter: {
            '1': 'فصل اول',
            '2': 'فصل دوم',
            '3': 'فصل سوم',
            '4': 'فصل چهارم',
            '5': 'فصل پنجم',
            '6': 'فصل ششم',
            '7': 'فصل هفتم',
            '8': 'فصل هشتم',
            '9': 'فصل نهم',
            '10': 'فصل دهم'
        }

    });
});
module.exports = rout;