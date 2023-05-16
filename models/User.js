const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    username:   { type: String, required: true, unique: true },
    password:   { type: String, required: true, select: false },
    telefone:   { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    modelo:     { type: String, required: true },
    placa:      { type: String, required: true, unique: true },
    avatar:     { type: String, required: true},
    background: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

var User = mongoose.model("User", UserSchema);

module.exports = {User, UserSchema};