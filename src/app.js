const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require('./swagger.config');
const app = express();

app.get("/test", (req, res) => {
    res.status(200).json("Hello world");
});

app.use(express.json());
app.use(express.static('public'));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerDocs));

module.exports = app;