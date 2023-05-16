module.exports = function (app) {
var authcont = app.controllers.authuser;
    app.post("/login_auth", authcont.login);

};