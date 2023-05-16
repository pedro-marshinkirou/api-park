module.exports = function (app){
const userServ = require("../services/userserv");
      mongoose = require("mongoose");
var allcontrol = {
        create: async (req, res) => {
            try{    
                var { name, username, password, telefone, email, modelo, placa, avatar, background } = req.body;

                if (!name || !username || !password || !telefone || !email || !modelo || !placa || !avatar || !background) {
                    res.status(400).send({ messsage: "preencha todos os campos do formulário."});
                }

                var user = await userServ
                    .createUsrsvc(req.body)
                    .catch((err) => console.log(err.messsage));

                if (!user){
                    return res.status(400).send({ message: "Erro ao criar Usuário" });
                }

                res.status(201).send({
                    messsage: "usuario cadastrado com sucesso",
                    user: {
                        id: user._id,
                        name,
                        username,
                        telefone,
                        email,
                        modelo,
                        placa,
                        avatar,
                        background, 
                    },
                });
            } catch (err){
                res.status(500).send({ message: err.message})
            }
        },
        findAll: async (req, res) => {
            try{
                var users = await userServ.findAllserv();

                if(users.length === 0){
                    return res.status(400)
                    .send({message: "não há usuários cadastrados"});
                }

                res.send(users);
            } catch (err) {
                res.status(500)
                .send({message: err.message});
            }
        },
        findById: async (req, res) => {
           try{
                const id = req.params.id;
                const user = await userServ.findByIdServ(id);
                console.log(user);
                res.send(user);
           } catch (err) {
            res.status(500)
            .send({message: err.message});
            }
        },
        update: async (req, res) => {
            try{
                var { name, username, password, telefone, email, modelo, placa, avatar, background } = req.body;

                if (!name && !username && !password && !telefone && !email && !modelo && !placa && !avatar && !background) {
                    res.status(400).send({ messsage: "modifique pelo menos 1 campo para atualizar."});
                }
                
                var id = req.params.id;
                
                await userServ.updateServ(
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
                );

                res.send({message: "Usuario atualizado com sucesso."});
            } catch (err) {
                res.status(500)
                .send({message: err.message});
                }
            },
    };
return allcontrol;
};