const {User} = require("../models/User.js");
      useri = require("../controllers/usercont")

var createUsrsvc = (body) => User.create(body);

var findAllserv = () => User.find();

var findByIdServ = (id) => User.findById(id);

var updateServ = (
    id,
    name, 
    username, 
    password, 
    telefone, 
    email, 
    modelo, 
    placa, 
    avatar, 
    background 
) => 
    User.findOneAndUpdate(
        {_id: id},
        {name, username, password, telefone, email, modelo, placa, avatar, background }
    );

module.exports = {
    createUsrsvc,
    findAllserv,
    findByIdServ,
    updateServ,
};