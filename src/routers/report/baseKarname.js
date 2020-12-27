const rout = require("express").Router();
const axios = require('axios');
const nodeHtmlToImage = require('node-html-to-image');

const { baseRoot } = require('../../../constants');

const url = 'http://localhost:5000/generateReport';


rout.get('/image-karname', async(req, res) => {
    axios(url)
        .then(response => {
            const html = response.data;
            let options = {
                "format": "A4",
                "orientation": "landscape", // portrait or landscape
            };

            nodeHtmlToImage({
                    output: './image.png',
                    html: html,
                })
                .then(() => {
                    console.log('hi created');
                    // res.status(200).json({ path: baseRoot + '/karname' + '/image.png' });
                    // return;
                })
        })
        .catch(e => {
            res.status(400).json(e);
        });
});

module.exports = rout;