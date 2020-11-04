const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require('path');
const swagger_path = path.resolve(__dirname, './swagger.config.yaml');
const swaggerParser = require('swagger-parser');
const swaggerDocument = YAML.load(swagger_path)
const dbStart = require('../src/db/mongoose');
const userRouts = require('../src/routers/user/userRouts');
const classRouts = require('../src/routers/class/classRouts');
const path = require('path');
const bodyParser = require('body-parser');
// create the app express
const app = express();
// start the db
dbStart();

// create test api 
app.get("/test", (req, res) => {
    res.status(200).json("Hello world");
});

// middelware use
app.use(express.static(__dirname + '/views/404/dist'));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(express.static('public'));
const parser = new swaggerParser();
var func = async function () {
    parsedSwaggerDocument = await parser.bundle(swagger_path);
};
func();
console.log(parsedSwaggerDocument);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(parsedSwaggerDocument));
app.use('/user', userRouts);
app.use('/class', classRouts);

// 404 page
app.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './views/404/dist')
    });
    // res.json('error')
});

module.exports = app;