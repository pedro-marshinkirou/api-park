const {Park} = require("../models/parks.js");
var ObjectID = require('mongodb').ObjectID;

var crtServc = (body) => Park.create(body);

var getServc = (offset, limit) => Park.find().sort({_id: -1}).skip(offset).limit(limit).populate("usuario");

var countPark = () => Park.countDocuments();

var newparkServ = () => Park.findOne().sort({_id: -1}).populate("usuario");

var findparkspecificbyID = (_id) => Park.findOne({ id: _id , usuario: _id}).populate("usuario"); 

var updtparkbyID = (ud, id) => Park.findOne({_id: ud, usuario: id}).populate("usuario");

var searchpark = (title) => Park.find({title: {$regex: `${title || ""}`, $options: "i"},}).sort({_id: -1}).populate("usuario");

var reservsmaydbyuser = (_id) => Park.find({usuario: _id}).sort({_id: -1}).populate("usuario");

var updtcomm =  (ud, id, title, description, profpic) => Park.findOneAndUpdate({_id: ud, usuario: id}, {title, description, profpic});

var ersestac = (ud) => Park.findOneAndDelete({_id: ud});

var upvoteterm = (ud, id) => Park.findOneAndUpdate({_id: ud, "likes.id": {$nin: [id]}}, {$push: {likes: {id, created: new Date() }}});

var dellupvoteterm = (ud, id) => Park.findOneAndUpdate({_id: ud}, {$pull: {likes: {id: id}}});

var commalgo = (id, comment, ud) => {
    var idcomm = Math.floor(Date.now() * Math.random()).toString(32);
    return Park.findOneAndUpdate({_id: ud}, {$push:{comments: {idcomm, id, comment, createdAt: new Date()}}});
};

var dellcommalgo = (id, idcomm, idPark) => Park.findOneAndUpdate({_id: idPark}, {$pull:{comments: {idcomm: idcomm, id: id}}});

module.exports = {
    crtServc,
    getServc,
    countPark,
    newparkServ,
    findparkspecificbyID,
    updtparkbyID,
    searchpark,
    reservsmaydbyuser,
    updtcomm,
    ersestac,
    upvoteterm,
    dellupvoteterm,
    commalgo,
    dellcommalgo,
};