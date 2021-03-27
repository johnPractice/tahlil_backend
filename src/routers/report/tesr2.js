const rout = require("express").Router();
const axios = require('axios');
let pdf = require("html-pdf");
const { baseRoot } = require('../../../constants');

const url = 'http://localhost:5000/generateReport';


rout.get('/test2', async(req, res) => {
    axios(url)
        .then(response => {
            const html = response.data;
            console.log(html);
            let options = {
                "format": "A4",
                "orientation": "landscape", // portrait or landscape
            };
            pdf.create(html).toFile(baseRoot + "/karname/report.pdf", function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(data);
                    res.send("File created successfully");
                }
            });

        })
        .catch(console.error);
});

module.exports = rout;