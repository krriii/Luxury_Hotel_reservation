const Reservation = require('../models/reservation');
const roomprices = require('../price.json');

class ReservationController {
    constructor() {
        this.lastReservation = null;
        this.postReservation = this.postReservation.bind(this);  // Explicitly bind 'this'
    }

    getIndex(req, res, next) {
        const allReservations = Reservation.fetchAll();
        res.render('index', {
            pageTitle: 'Home',
            path: '/',
            reservations: allReservations,
            hasReservations: allReservations.length > 0
        });
    }

    getReservationForm(req, res, next) {
        res.render('reservationform', {
            pageTitle: 'Make a Reservation',
            path: '/reservation'
        });
    }

    postReservation(req, res, next) {
        const { name, email, roomType, checkInDate, checkOutDate } = req.body;

        const totalPrice = this.calculateTotalPrice(checkInDate, checkOutDate, roomType);

        const newReservation = new Reservation(name, email, roomType, checkInDate, checkOutDate, totalPrice);
        newReservation.save();
        this.lastReservation = newReservation;

        res.redirect('/confirmation');
    }

    async getConfirmation(req, res, next) {
        try {
            const latestReservation = await Reservation.fetchAll().slice(-1)[0];
            const allReservations = await Reservation.fetchAll();

            res.render('confirmation', {
                pageTitle: 'Reservation Confirmation',
                path: '/confirmation',
                reservation: latestReservation,
                allReservations: allReservations
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error fetching reservations.");
        }
    }

    calculateTotalPrice(checkInDate, checkOutDate, roomType) {
        const price = roomprices[roomType];
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        return price * days;
    }
}

module.exports = new ReservationController();

