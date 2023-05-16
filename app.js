const connectDatabase = require("./db2");
var express = require("express");
    app = express();
    load = require("express-load");
    session = require("express-session");
    bodyParser = require("body-parser");
    mysql = require("mysql2");
    cors = require("cors");
    dotenv = require("dotenv");
    bcrypt = require("bcryptjs");
    jwt = require("jsonwebtoken");
    db2 = require("./db2");

connectDatabase();    
dotenv.config();
app.set("models", "./models");
app.use(cors());
app.use(express.json());
app.use(session({secret:'cataruxamo1@#h%&gf3'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(process.env.PORT || 5000, () => console.log('app is running'));

load("controllers") .then("routes") .into(app); 
console.log("siis");

