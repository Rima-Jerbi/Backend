const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  Stand: { type: mongoose.Schema.Types.ObjectId, ref: 'Stand', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  companyDescription: { type: String, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
