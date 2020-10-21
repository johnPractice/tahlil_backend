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

    apis: ['./src/routers/*.swagger.js', './src/*.swagger.js', './src/routers/user/*.swagger.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerDocs,
    swaggerOptions
};