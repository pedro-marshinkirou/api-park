module.exports = function (app) {
    const swaggerUi = require("swagger-ui-express");
    const swaggerDoc = require("../swagger.json");

    app.use("/doc", swaggerUi.serve);
    app.get("/doc", swaggerUi.setup(swaggerDoc)); 
};