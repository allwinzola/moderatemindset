const mod_mongoose = require('mongoose');
require('dotenv').config();
mod_mongoose
.connect(process.env.MOD_MONGO_URL)
.then(() => console.log("MONGODB for Moderate Created", process.env.MOD_MONGO_URL))
.catch((err) =>console.log("Error Connecting to MongoDB",err));

module.exports = mod_mongoose;