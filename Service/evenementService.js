const Evenement = require("../model/evenement");
const Foire = require("../model/foire");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

class EvenementService {
  static async getAllEvent() {
    try {
      const AllEvent = await Evenement.find().populate("reservations");
      return AllEvent;
    } catch (error) {
      console.log(`Could not fetch events ${error}`);
    }
  }

  static async createEvent(data, file) {
    try {
      const newEvent = {
        EventName: data.EventName,
        DateDebut: data.DateDebut,
        DateFin: data.DateFin,
        description: data.description,
        photo: file ? file.path : null,
      };
      const response = await new Evenement(newEvent).save();
      const foire = await Foire.findById("65c220ca9aeb263b734a054b");
      foire.evenements.push(response._id);
      await foire.save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getEventById(eventId) {
    try {
      return await Evenement.findById(eventId).populate("reservations");
    } catch (error) {
      console.error(`Event not found: ${error}`);
      throw error;
    }
  }

  static async updateEvent(eventId, updatedEventData) {
    try {
      const updateResponse = await Evenement.updateOne(
        { _id: eventId },
        { $set: updatedEventData }
      );
      return updateResponse;
    } catch (error) {
      console.error(`Could not update event: ${error}`);
      throw error;
    }
  }

  static async deleteEvent(eventId) {
    try {
      return await Evenement.findOneAndDelete({ _id: eventId });
    } catch (error) {
      console.error(`Could not delete event: ${error}`);
      throw error;
    }
  }

  static async addReservation(eventId, savedReservation) {
    try {
      const updatedEvent = await Evenement.findByIdAndUpdate(
        eventId,
        { $push: { reservations: savedReservation } },
        { new: true }
      );
      return await updatedEvent;
    } catch (error) {
      console.error(`Could not delete event: ${error}`);
      throw error;
    }
  }
}

module.exports = EvenementService;
