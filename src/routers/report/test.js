const rout = require("express").Router();
const express = require('express');
const path = require('path');
let ejs = require("ejs");
let pdf = require("html-pdf");
const { baseRoot } = require('../../../constants');
let students = [{
        name: "Joy",
        email: "joy@example.com",
        city: "New York",
        country: "USA"
    },
    {
        name: "John",
        email: "John@example.com",
        city: "San Francisco",
        country: "USA"
    },
    {
        name: "Clark",
        email: "Clark@example.com",
        city: "Seattle",
        country: "USA"
    },
    {
        name: "Watson",
        email: "Watson@example.com",
        city: "Boston",
        country: "USA"
    },
    {
        name: "Tony",
        email: "Tony@example.com",
        city: "Los Angels",
        country: "USA"
    }
];
rout.get("/generateReport", (req, res) => {
    // res.json(__dirname);
    res.render("report-template");

    //     ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), { students: students }, (err, data) => {
    //         if (err) {
    //             res.send(err);
    //             return
    //         } else {
    //             // "header": {
    //             //     "height": "20mm"
    //             // },
    //             // "footer": {
    //             //     "height": "20mm",
    //             // },
    //             let options = {
    //                 "format": "A4",
    //                 "orientation": "landscape", // portrait or landscape
    //             };
    //             pdf.create(data, options).toFile(baseRoot + "/karname/report.pdf", function(err, data) {
    //                 if (err) {
    //                     res.send(err);
    //                 } else {
    //                     console.log(data);
    //                     res.send("File created successfully");
    //                 }
    //             });
    //         }
    //     });
});
module.exports = rout;