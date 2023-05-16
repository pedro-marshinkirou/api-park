module.exports = function (app) {
const parkServ = require("../services/parkserv");
const mongoose = require("mongoose");
    var allparkcontrol = {
        create: async (req, res) => {
         try {
            var { authorization } = req.headers;
            if(!authorization) {
                return res.send(401);
            }

            var slices = authorization.split(" ");
            console.log(slices);

            var {title, description, profpic} = req.body;
            
            if(!title || !description || !profpic) {
                res.status(400).send({
                    message: "todos os campos são necessários para cadastrar um estacionamento"
                });
            }
            await parkServ.crtServc({
                title,
                description,
                profpic,
                usuario: req.userid,
            });
            
            res.send(201);
        } catch (err) {
            res.status(500)
            .send({message: err.message});
        }
        },
        getall: async (req, res) => {
            try {
                let {limit, offset} = req.query;
                
                limit = Number(limit);
                offset = Number(offset);

                if(!limit){
                    limit = 6;
                }

                if(!offset){
                    offset = 0;
                }

                console.log(limit, offset);
                var estac = await parkServ.getServc(offset, limit);
                var total = await parkServ.countPark();
                var currentURL = req.baseUrl;
               
                var proxime = offset + limit;
                var proximeURL = proxime < total ? `${currentURL}?limit=${limit}&offset=${proxime}`: null;

                var previa = offset - limit < 0 ? null : offset - limit;
                var previaURL = previa != null ? `${currentURL}?limit=${limit}&offset=${previa}` : null;

                if(estac.length === 0){
                    return res.status(400)
                    .send({message: "não há estacionamentos cadastrados"});
                }
                res.send({
                    proximeURL, 
                    previaURL, 
                    limit, 
                    offset, 
                    total, 
                    
                    resultados: estac.map((item) => ({
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        profpic: item.profpic,
                        likes: item.likes,
                        comments: item.comments,
                        name: item.usuario.name,
                        username: item.usuario.username,
                        usavatar: item.usuario.avatar,
                    })),
                });
            } catch (err) {
                res.status(500)
                .send({message: err.message});
            }
        },
        mvparks: async (req, res) => {
            try {
                var mostparks = await parkServ.newparkServ();

                if (!mostparks) {
                    return res.status(400).send({message: "there is no park"});
                }

                res.send({
                    mostparks: {
                        id: mostparks._id,
                        title: mostparks.title,
                        description: mostparks.description,
                        profpic: mostparks.profpic,
                        likes: mostparks.likes,
                        comments: mostparks.comments,
                        name: mostparks.usuario.name,
                        username: mostparks.usuario.username,
                        usavatar: mostparks.usuario.avatar,
                    }
                });
            } catch (err) {
                res.status(500).send({message: err.message});
            }
        },
        findparkbyID: async (req, res) => {
            try{
                var lieben = req.userid;
                console.log(lieben);
                var id = req.params.id;
                console.log(typeof id);
                console.log(id);
                var PARKUM = await parkServ.findparkspecificbyID(lieben);
                console.log(PARKUM);
                return res.send({
                    PARKUM: {
                        id: PARKUM._id,
                        title: PARKUM.title,
                        description: PARKUM.description,
                        profpic: PARKUM.profpic,
                        likes: PARKUM.likes,
                        comments: PARKUM.comments,
                        name: PARKUM.usuario.name,
                        username: PARKUM.usuario.username,
                        usavatar: PARKUM.usuario.avatar,
                    }
                });
            } catch (err){
                res.status(500).send({message: err.message}); 
            }
        }, 
        searchatpark: async (req, res) => {
            try{
                var {title} = req.query
                var searchas = await parkServ.searchpark(title);

                if(searchas.length === 0){
                    return res.status(400).send({message: 'nenhum estacionamento com esse nome'});
                }

                return res.send({
                    resultados: searchas.map((item) => ({
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        profpic: item.profpic,
                        likes: item.likes,
                        comments: item.comments,
                        name: item.usuario.name,
                        username: item.usuario.username,
                        usavatar: item.usuario.avatar,
                    })),
                });
            } catch (err){
                res.status(500).send({message: err.message}); 
            }
        },
        resmadebyuser: async (req, res) => {
            try{
                var id = req.userid;
                var parkalot = await parkServ.reservsmaydbyuser(id);
                return res.send({
                    resultados: parkalot.map((item) => ({
                        id: item._id,
                        title: item.title,
                        description: item.description,
                        profpic: item.profpic,
                        likes: item.likes,
                        comments: item.comments,
                        name: item.usuario.name,
                        username: item.usuario.username,
                        usavatar: item.usuario.avatar,
                    })),
                });
            } catch (err){
                res.status(500).send({message: err.message}); 
            }
        },
        updt: async (req, res) => {
            try {
                var {title, description, profpic} = req.body;
                var liet = req.userid;
                var id = mongoose.Types.ObjectId(liet);
                var luseu = req.params;
                var ud = mongoose.Types.ObjectId(luseu);

                if(!title && !description && !profpic) {
                    res.status(400).send({
                        message: "pelo menos um campo é necessário para atualizar um estacionamento"
                    });
                }
        
                var park = await parkServ.updtparkbyID(ud, id);
                console.log(req.body);
                console.log(park);
                console.log(park._id);
                console.log(typeof park._id);
                console.log(ud);
                console.log(typeof ud);
                console.log(req.params);
                console.log(typeof req.params);
                console.log(id);
                console.log(typeof id);
                if(String(park.usuario._id) != req.userid){
                    return res.status(400).send({
                        message: "você não pode modificar esse registro",
                    }); 
                }

                await parkServ.updtcomm(ud, id, title, description, profpic);

                return res.send({ message: "atualização bem sucedida"});
            } catch (err){
                res.status(500).send({message: err.message}); 
            }
        },
        delltac: async (req, res) => {
            try{
                var luseu = req.params;
                var ud = mongoose.Types.ObjectId(luseu);
                var liet = req.userid;
                var id = mongoose.Types.ObjectId(liet);

                var park = await parkServ.updtparkbyID(ud, id);
                console.log(req.body);
                console.log(park);
                console.log(park._id);
                console.log(typeof park._id);
                console.log(ud);
                console.log(typeof ud);
                console.log(req.params);
                console.log(typeof req.params);
                console.log(id);
                console.log(typeof id);
                if(String(park.usuario._id) != req.userid){
                    return res.status(400).send({
                        message: "você não pode apagar esse registro",
                    }); 
                }
                
                await parkServ.ersestac(ud);
                return res.send({ message: "apagado com sucesso"});
            }catch (err){
                res.status(500).send({message: err.message}); 
            }
        },
        cool: async (req,res) => {
            try{
                var luseu = req.params;
                var ud = mongoose.Types.ObjectId(luseu);
                console.log(ud);
                var liet = req.userid;
                var id = mongoose.Types.ObjectId(liet);
                console.log(id);

                var cooled = await parkServ.upvoteterm(ud, id);
                console.log(cooled);
                if(!cooled){
                    await parkServ.dellupvoteterm(ud, id);
                    return res.status(200).send({message: "cooled rmvd"})
                }
                res.send({message: "upvoted succesfully"});
            } catch (err){
                res.status(500).send({message: err.message}); 
            }
        },
        addcomms: async (req,res) => {
            try{
                var luseu = req.params;
                var ud = mongoose.Types.ObjectId(luseu);
                console.log(ud);
                var liet = req.userid;
                var id = mongoose.Types.ObjectId(liet);
                console.log(id);
                var { comment } = req.body;

                if(!comment){
                    return res.status(400).send({message: "por favor insira algo para comentar"});
                }

                await parkServ.commalgo(id, comment, ud); //seria desconstruido aqui?
                res.send({message: "comentado com sucesso"});
            } catch (err){
                res.status(500).send({message: err.message}); 
            }
        },
        rmvcomms: async (req,res) => {

            var luseu = req.params;
            var idPark = mongoose.Types.ObjectId(luseu);
            console.log(idPark + 'idEstacionamento');
            var liet = req.userid;
            var id = mongoose.Types.ObjectId(liet);
            console.log(id + 'idusuário');
            var { idcomm } = req.params;
            console.log(idcomm + 'id comentário');

            var delcom = await parkServ.dellcommalgo(id, idcomm, idPark);
            console.log(delcom);

          /*var commdell = delcom.comments.find((idcomm) => idcomm === idcomm);
                console.log(commdell);

            if (commdell.id !== id) {
                return res.status(400).send({message: "Não autorizado"});
            }*/

            res.send({message: "removido com sucesso"});
        },
    };
return allparkcontrol;
};