const ReservationService = require('../Service/reservationService');

class ReservationController {
  static async createReservation(req, res, next) {
    try {
      const reservation = await ReservationService.createReservation(req.body);
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getReservationsByUser(req, res, next) {
    try {
      const reservations = await ReservationService.getReservationsByUser(req.params.userId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const updatedReservation = await ReservationService.updateReservation(req.params.reservationId, req.body);
      res.json(updatedReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async cancelReservation(req, res, next) {
    try {
      const { reservationId, StandId } = req.params;
      const reservation = await ReservationService.cancelReservation(reservationId, StandId);
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllReservations(req, res, next) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReservationController;
