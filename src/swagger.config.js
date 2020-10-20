const swaggerJsDoc = require("swagger-jsdoc");
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

    apis: ['./src/swagger.config.js', './src/routers/*.swagger.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// use middelware

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

module.exports = {
    swaggerDocs,
    swaggerOptions
};