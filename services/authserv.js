const {User} = require("../models/User.js");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

var logserv = (email) => User.findOne({email: email}).select("+password");

var generateToken = (id, email) => jwt.sign({id: id, email: email}, process.env.SECRET_JWT, {expiresIn: '2h'});

module.exports = {logserv, generateToken};