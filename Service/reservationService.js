const Reservation = require("../model/reservation");
const Stand = require("../model/Stand");

class ReservationService {
  static async createReservation(data) {
    if (
      !data.StandId ||
      !data.userId ||
      !data.companyName ||
      !data.companyDescription
    ) {
      throw new Error("All fields are required");
    }

    const reservations = await Reservation.find({ user: data.userId });
    if (reservations.length >= 2) {
      throw new Error("Only 2 reservation by User");
    }
    console.log(reservations.length);

    const reservation = new Reservation({
      Stand: data.StandId,
      user: data.userId,
      companyName: data.companyName,
      companyDescription: data.companyDescription,
    });

    await reservation.save();

    await Stand.findByIdAndUpdate(data.StandId, {
      disponibilite: false,
      companyName: data.companyName,
      description: data.companyDescription,
    });

    return reservation;
  }

  static async getReservationsByUser(userId) {
    try {
      const reservations = await Reservation.find({ user: userId }).populate(
        "Stand"
      );
      return reservations;
    } catch (error) {
      throw new Error("Failed to fetch reservations");
    }
  }

  static async updateReservation(reservationId, updatedData) {
    console.log("Updating reservation with ID:", reservationId);
    console.log("Updated data:", updatedData);
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updatedData,
      { new: true }
    );
    const updatedStand = await Stand.findByIdAndUpdate(updatedReservation.Stand, {
      companyName: updatedReservation.companyName,
      description: updatedReservation.companyDescription,
    });
    console.log("Updated reservation:", updatedReservation);
    return updatedReservation;
  }

  static async getAllReservations() {
    return Reservation.find();
  }

  static async cancelReservation(reservationId, StandId) {
    console.log("Canceling reservation with ID:", reservationId);
    const reservation = await Reservation.findByIdAndDelete(reservationId);
    if (reservation) {
      await Stand.findByIdAndUpdate(StandId, {
        disponibilite: true,
        companyName: "",
        description: "",
      });
      console.log("Updated Stand with ID:", StandId);
    }
    return reservation;
  }
}

module.exports = ReservationService;
