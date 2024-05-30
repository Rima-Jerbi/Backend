const mongoose = require("mongoose");

const EvenementSchema = mongoose.Schema({
  EventName: {
    type: String,
    required: [true, "Please enter your event name"],
  },
  DateDebut: {
    type: Date,
    required: [true, "Please enter the initial Date of the event "],
  },
  DateFin: {
    type: Date,
    required: [true, "Please enter the final Date of the event "],
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});

const Evenement = mongoose.model("Evenement", EvenementSchema);
module.exports = Evenement;
