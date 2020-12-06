const rout = require('express').Router();
rout.get('/time', (req, res) => {
    const date = new Date();
    res.json({
        timeStamp: date.getTime(),
        time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        date
    });
});
module.exports = rout;