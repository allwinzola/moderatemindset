const express = require("express");
const cors = require("cors");
const Mod_App_Server = express();

Mod_App_Server.use(express.json()); 
Mod_App_Server.use(cors()); 

Mod_App_Server.use('/modapi', require('./ModRoute/userRoutes'));
Mod_App_Server.use('/modapi', require('./ModRoute/checkinRoutes'));

module.exports = Mod_App_Server;
