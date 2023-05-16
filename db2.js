var mongoose = require('mongoose');
const dotenv = require("dotenv");
    dotenv.config();
    
var connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI) .then(() => console.log("mongoDB atlas conectado.")) .catch((error) => console.log(error));
}

module.exports = connectDatabase;