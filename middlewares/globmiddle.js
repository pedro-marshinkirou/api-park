const userServ = require("../services/userserv");
      mongoose = require("mongoose");

      var idValid = (req, res, next) => {
        try{
            const id = req.params.id;

            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).send({message: "ID Invalido"});
            }

            next();
        }catch (err) {
            res.status(500)
            .send({message: err.message});
        }
        };
      var userValid = async (req, res, next) => {
        try{
            const id = req.params.id;
            const user = await userServ.findByIdServ(id);

            if(!user){
                return res.status(400).send({ message: "Usuario não encontrado."});
            }

            next();
        } catch (err) {
            res.status(500)
            .send({message: err.message});
        }
        };

module.exports = { idValid, userValid };
