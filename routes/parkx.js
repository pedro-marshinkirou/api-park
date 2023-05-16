module.exports = function (app) {
const { authmidd } = require("../middlewares/authmiddle");
var parkmet = app.controllers.parkcont;
    app.post('/cadpark',  authmidd, parkmet.create);
    app.get('/getparks', parkmet.getall);
    app.get('/mv', parkmet.mvparks);
    app.get('/searchfor', parkmet.searchatpark);
    app.get('/madebyuser', authmidd, parkmet.resmadebyuser);
    app.get('/search/:id',authmidd, parkmet.findparkbyID);
    app.patch('/updt/:id',authmidd, parkmet.updt);
    app.delete('/delestac/:id', authmidd, parkmet.delltac);
    app.patch('/evaluate/:id', authmidd, parkmet.cool);
    app.patch('/saysay/:id', authmidd, parkmet.addcomms);
    app.patch('/notsay/:id/:idcomm', authmidd, parkmet.rmvcomms);
    

};