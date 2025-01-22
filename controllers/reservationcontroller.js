const Reservation = require('../models/reservation'); 
const roomprices=require('../price.json');

let lastReservation = null;
exports.getIndex = (req, res, next) => {
    const allReservations = Reservation.fetchAll();
    res.render('index', {
        pageTitle: 'Home',
        path: '/',
        reservations: allReservations,
        hasReservations: allReservations.length > 0
    });
};

exports.getReservationForm = (req, res, next) => {
    res.render('reservationform', {
        pageTitle: 'Make a Reservation',
        path: '/reservation'
    });
};


exports.postReservation = (req, res, next) => {
    const { name, email, roomType, checkInDate, checkOutDate } = req.body; 

    const totalPrice = calculateTotalPrice(checkInDate, checkOutDate, roomType); 

    const newReservation = new Reservation(name, email, roomType, checkInDate, checkOutDate, totalPrice); 
    newReservation.save(); 
    lastReservation = newReservation; 

    res.redirect('/confirmation'); 
};

exports.getConfirmation = async (req, res, next) => {
    try {
       
        const latestReservation = await Reservation.fetchAll().slice(-1)[0];
        console.log(latestReservation);

      
        const allReservations = await Reservation.fetchAll();
        console.log(allReservations);

        
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
};


function calculateTotalPrice(checkInDate, checkOutDate, roomType) {
    const price = roomprices[roomType];
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return price * days;
}