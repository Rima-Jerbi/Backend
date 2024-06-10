// model/serialNumber.js
const mongoose = require('mongoose');

const SerialNumberSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('SerialNumber', SerialNumberSchema);
