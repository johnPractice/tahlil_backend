const rout = require("express").Router();
const axios = require('axios');

const { buildMode, usrAddLocal, urlName } = require('../../../constants');

rout.get('/class/:classId/reportImage', async(req, res, next) => {
    const { classId } = req.params;
    const { authorization } = req.headers;

    const url = encodeURI(`${buildMode == true ? `${urlName}class/${classId}/report}` : `http://${usrAddLocal}/class/${classId}/report`}`);

    const response = await axios({
        baseURL: url,
        headers: { authorization }
    });
});

//module.exports = rout;