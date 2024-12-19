const express = require('express');
const modrouter = express.Router();
const checkInController = require('../ModController/checkinController');

modrouter.post('/createcheckins', checkInController.createCheckIn);
modrouter.get('/getLoggedInUserCheckins', checkInController.getLoggedInUserCheckins);

module.exports = modrouter;
