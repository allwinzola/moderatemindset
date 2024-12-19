const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const checkinSchema = new Schema({
  moodrating: { type: Number, required: true },
  stressLevel: { type: String, required: true },
  feelings: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'modpr', required: true },
},{collection: 'modcheckincollection'});

module.exports = model('modpost', checkinSchema)


