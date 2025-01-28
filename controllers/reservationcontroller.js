const Reservation = require('../models/reservation');
const roomprices = require('../price.json');

class ReservationController {
    constructor() {
        this.lastReservation = null;
        this.postReservation = this.postReservation.bind(this);  // Explicitly bind 'this'
        this.updateReservation = this.updateReservation.bind(this);
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

    async postReservation(req, res, next) {
        try {
            const { name, email, roomType, checkInDate, checkOutDate } = req.body;
    
            const totalPrice = this.calculateTotalPrice(checkInDate, checkOutDate, roomType);
    
            const newReservation = await Reservation.create({
                name,
                email,
                roomType,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                totalPrice
            });

               // Store reservation data in session
            req.session.lastReservation = {
            id: newReservation.id,
            name,
            email,
            roomType,
            checkInDate,
            checkOutDate,
            totalPrice
    };
    
            //this.lastReservation = newReservation;
    
            res.redirect('/confirmation');
        } catch (error) {
            console.error('Error creating reservation:', error);
            res.status(500).render('error', { error: 'An error occurred while processing your reservation.' });
        }
    }

    async getEditReservation(req, res, next) {
        try {
            const { id } = req.params;
            const reservation = await Reservation.findByPk(id);
            if (!reservation) {
                return res.status(404).render('404', { pageTitle: 'Reservation Not Found' });
            }
            res.render('edit-reservation', { 
                pageTitle: 'Edit Reservation',
                path: '/edit-reservation',
                reservation: reservation
            });
        } catch (error) {
            console.error('Error fetching reservation for edit:', error);
            res.status(500).render('500', { pageTitle: 'Error', error: 'An error occurred while fetching the reservation.' });
        }
    }
    

    async getDeleteConfirmation(req, res, next) {
        try {
            const { id } = req.params;
            const reservation = await Reservation.findByPk(id);
            if (!reservation) {
                return res.status(404).render('404', { pageTitle: 'Reservation Not Found' });
            }
            res.render('delete-confirmation', { 
                pageTitle: 'Delete Reservation',
                path: '/delete-confirmation',
                reservation: reservation
            });
        } catch (error) {
            console.error('Error fetching reservation for delete:', error);
            res.status(500).render('500', { pageTitle: 'Error', error: 'An error occurred while fetching the reservation.' });
        }
    }
    async getConfirmation(req, res, next) {
        try {
          const lastReservation = req.session.lastReservation;
          const allReservations = await Reservation.fetchAll();
          
          if (!lastReservation) {
            return res.redirect('/');  // Redirect if no reservation in session
          }
      
          res.render('confirmation', {
            pageTitle: 'Reservation Confirmation',
            path: '/confirmation',
            reservation: lastReservation,
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



    async updateReservation(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email, roomType, checkInDate, checkOutDate } = req.body;
    
            console.log('Updating reservation:', { id, name, email, roomType, checkInDate, checkOutDate });
    
            const reservation = await Reservation.findByPk(id);
            if (!reservation) {
                console.log('Reservation not found:', id);
                return res.status(404).render('404', { pageTitle: 'Reservation Not Found' });
            }
    
            const totalPrice = this.calculateTotalPrice(checkInDate, checkOutDate, roomType);
    
            await reservation.update({
                name,
                email,
                roomType,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                totalPrice
            });
    
            console.log('Reservation updated successfully');
            res.redirect('/confirmation');
        } catch (error) {
            console.error('Error updating reservation:', error);
            next(error);
        }
    }
    
    
    
      
    
    async deleteReservation(req, res, next) {
        try {
            const { id } = req.params;
            const reservation = await Reservation.findByPk(id);
            if (!reservation) {
                return res.status(404).render('404', { pageTitle: 'Reservation Not Found' });
            }
    
            await reservation.destroy();
            res.redirect('/');
        } catch (error) {
            console.error('Error deleting reservation:', error);
            res.status(500).render('500', { pageTitle: 'Error', error: 'An error occurred while deleting the reservation.' });
        }
    }
    
    
    
 
    
}

module.exports = new ReservationController();

