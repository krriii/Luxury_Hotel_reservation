const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationcontroller');

// Homepage route
router.get('/', reservationController.getIndex);

// Reservation form route
router.get('/reservation', reservationController.getReservationForm);

// Post request to handle reservation form submission
router.post('/reservation', reservationController.postReservation);

// In your routes file
router.get('/reservation/:id/edit', reservationController.getEditReservation);
router.post('/reservation/:id/update', reservationController.updateReservation);
router.get('/reservation/:id/delete', reservationController.getDeleteConfirmation);
router.post('/reservation/:id/delete', reservationController.deleteReservation);

module.exports = router;
