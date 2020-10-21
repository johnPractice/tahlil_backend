const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require('./swagger.config');
const userLogin = require('../src/routers/user/user.login');
const dbStart = require('../src/db/mongoose');
// create the app express
const app = express();
// start the db
dbStart();

// create test api 
app.get("/test", (req, res) => {
    res.status(200).json("Hello world");
});

// middelware use
app.use(express.json());
app.use(express.static('public'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerDocs));
app.use('/user', userLogin);

module.exports = app;