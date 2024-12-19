const express = require('express');
const MOD_HTTP_SERVER = express();
const cors = require('cors');
require('./Database/dbconfig');
const PORT = process.env.PORT || 5001;
const path = require('path');

MOD_HTTP_SERVER.use(express.json());
MOD_HTTP_SERVER.use(express.urlencoded({extended:false}));
MOD_HTTP_SERVER.use(cors());

MOD_HTTP_SERVER.use('/',require('./app'))

MOD_HTTP_SERVER.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`);
});

MOD_HTTP_SERVER.get('/',(req,res)=>{
    res.send(" server is running");
})

