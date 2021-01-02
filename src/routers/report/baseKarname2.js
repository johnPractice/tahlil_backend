const rout = require("express").Router();
const axios = require('axios');
const auth = require('../../middelware/auth');
const nodeHtmlToImage = require('node-html-to-image');

const { baseRoot, buildMode, usrAddLocal, urlName } = require('../../../constants');



rout.get('/image-karname/:examId', auth, async(req, res) => {
            const { user } = req;
            const { lastname, firstname } = user;
            const { examId } = req.params;
            const { authorization } = req.headers;
            if (!examId) return res.status(400).json({ "error": "قسمت های ضروری باید وارد شوند" });
            const url = encodeURI(`${buildMode==true?`${urlName}generateReport/?examId=${examId}&userId=${user._id}&name=${firstname+' '+lastname}}`:`http://${usrAddLocal}/generateReport/?examId=${examId}&userId=${user._id}&name=${firstname+' '+lastname}`}`);
    axios({
            baseURL: url,
            headers:{
                authorization
            }
        })
        .then(response => {
            const html = response.data;
            nodeHtmlToImage({
                    output: baseRoot + '/public/karname' + '/image.png',
                    html: html,
                })
                .then(() => {
                    return res.status(200).json({
                        path: baseRoot + '\\public\\karname' + '\\image.png',
                        url
                    });
                }).catch(e => {
                   return res.status(400).json(e);
                });
        })
        .catch(e => {
            return res.status(400).json(e);
        });
});

module.exports = rout;