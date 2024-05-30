const express = require('express');
const router = express.Router();
const ReservationController = require('../Controller/reservationController');

router.post('/', ReservationController.createReservation);

router.get('/user/:userId', ReservationController.getReservationsByUser);

router.put('/:reservationId', ReservationController.updateReservation);

router.delete('/:reservationId/:StandId', ReservationController.cancelReservation);

router.get('/', ReservationController.getAllReservations);

module.exports = router;
