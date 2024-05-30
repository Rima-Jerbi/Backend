const mongoose = require('mongoose');

const StandSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  superficie: { type: Number, required: true },
  prix: { type: Number, required: true },
  disponibilite: { type: Boolean, default: true },
});

const Stand = mongoose.model('Stand', StandSchema);

module.exports = Stand;
