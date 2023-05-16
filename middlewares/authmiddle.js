const userServ = require("../services/userserv");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

var authmidd = (req, res, next) => {
    try {
        var { authorization } = req.headers;

        if(!authorization) {
            return res.send(401);
        }

        var parts = authorization.split(" ");

        if (parts.length !== 2){
            return res.send(401);
        }

        var [schema, token] = parts;

        if(schema !== "Bearer") {
            return res.send(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error){
                return res.status(401).send({message: "token expirado"});
            }
            console.log(decoded);

            var user = await userServ.findByIdServ(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({message: "token invalido"});
            }
    
            req.userid = user._id;

            return next();
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { authmidd };