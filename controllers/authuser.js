module.exports = function (app) {
const bcrypt = require('bcrypt');
const loginServ = require("../services/authserv");
    var autoriztn = {
        login: async (req, res) => {
            try {
                var { email, password } = req.body;
                var user = await loginServ.logserv(email);
                if(!user){
                    return res.status(404).send({message: "invalid user or password"})
                }
                var passvalid = await bcrypt.compare(password, user.password)
                if(!passvalid){
                    return res.status(400).send({message: "invalid user or password"})
                }

                var token = loginServ.generateToken(user.id, user.email)

                res.send({token});
            } catch (err) {
              res.status(500).send(err.message);      
            };
        },

    };
return autoriztn;
};