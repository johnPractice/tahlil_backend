const express = require("express");
const swaggerUi = require("swagger-ui-express");
const dbStart = require('../src/db/mongoose');
const userRouts = require('../src/routers/user/userRouts');
const classRouts = require('../src/routers/class/classRouts');
const questionRouts = require('./routers/question/questionRouts');
const path = require('path');
const bodyParser = require('body-parser');
const swagger_path = path.resolve(__dirname, './swagger.config.yaml');
const swaggerParser = require('swagger-parser');

const initiate = async () => {
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
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(await swaggerParser.bundle(swagger_path)));
    app.use('/question', questionRouts);
    app.use('/user', userRouts);
    app.use('/class', classRouts);

    // 404 page
    app.get('*', (req, res) => {
        res.sendFile('index.html', {
            root: path.join(__dirname, './views/404/dist')
        });
        // res.json('error')
    });
    return app;
}

module.exports = initiate;