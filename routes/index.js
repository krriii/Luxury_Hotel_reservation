const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationcontroller');

// Homepage route
router.get('/', reservationController.getIndex);

// Reservation form route
router.get('/reservation', reservationController.getReservationForm);

// Post request to handle reservation form submission
router.post('/reservation', reservationController.postReservation);

module.exports = router;
