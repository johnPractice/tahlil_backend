const rout = require("express").Router();
const axios = require('axios');
const puppeteer = require('puppeteer');

const { buildMode, usrAddLocal, urlName } = require('../../../constants');

rout.get('/class/:classId/reportImage', async(req, res, next) => {
    const { classId } = req.params;
    const { authorization } = req.headers;

    const url = encodeURI(`${buildMode == true ? `${urlName}class/${classId}/report}` : `http://${usrAddLocal}/class/${classId}/report`}`);

    const response = await axios({
        baseURL: url,
        headers: { authorization }
    });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(response.data);
    const image = await page.screenshot({ fullPage: true, encoding: "base64" });
    browser.close();

    res.status(200).json({ base64Image: image });
});

module.exports = rout;