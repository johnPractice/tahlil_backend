const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const constants = require('../constants');


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Tahlil backend API",
            description: "Tahlil bacend API Information",
            contact: {
                name: "Amazing Developer :)",
            },
            servers: [`${constants.buildMode?constants.urlAdd:constants.usrAddLocal}`]
        }
    },

    apis: ['./src/app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// use middelware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /test:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/test", (req, res) => {
    res.status(200).json("Hello world");
});

app.use(express.json());
app.use(express.static('public'));



module.exports = app;