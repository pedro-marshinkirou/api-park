const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    title:          { type: String, require: true, },
    description:    { type: String, require: true, },
    profpic:        { type: String, require:true, },
    Criado:         { type: Date, default: Date.now(), },
    usuario:        { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true, },
    likes:          { type: Array, require: true, },
    comments:       { type: Array, require: true, },
});

var Park = mongoose.model("Park", parkSchema);

module.exports = {Park, parkSchema};