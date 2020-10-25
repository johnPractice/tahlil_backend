const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require('./swagger.config');
const dbStart = require('../src/db/mongoose');
const userRouts = require('../src/routers/user/userRouts');
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
app.use('/user', userRouts);



module.exports = app;