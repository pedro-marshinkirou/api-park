module.exports = function (app) {
    const { idValid, userValid } = require("../middlewares/globmiddle");
    var usrcont = app.controllers.usercont;   
        app.post('/user', usrcont.create);
        app.get('/userget', usrcont.findAll);
        app.get('/getum/:id', idValid, userValid, usrcont.findById);
        app.patch('/:id', idValid, userValid, usrcont.update);
    };