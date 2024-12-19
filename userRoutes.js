const {Router} = require('express');
const Modrouter = Router();
const { modsignupUser, modloginUser } = require('../ModController/userController');

Modrouter.post('/signup', modsignupUser);
Modrouter.post('/login', modloginUser);

module.exports = Modrouter;
