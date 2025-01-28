// class Reservation {
//     // Private reservations array
//     static #reservations = [];

//     constructor(name, email, roomType, checkInDate, checkOutDate,totalPrice) {
//         this.name = name;
//         this.email = email;
//         this.roomType = roomType;
//         this.checkInDate = new Date(checkInDate);
//         this.checkOutDate = new Date(checkOutDate);
//         this.totalPrice = totalPrice;
//     }

//     // Getter for reservations
//     static get reservations() {
//         return Reservation.#reservations;
//     }

//     // Method to save a reservation
//     save() {
//         Reservation.#reservations.push(this);
//     }

  

//     // Static method to fetch all reservations
//     static fetchAll() {
//         return Reservation.#reservations;
//     }

 
   
// }

// // Export the model
// module.exports = Reservation;

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

// Static method to save a reservation
Reservation.saveReservation = async function(reservationData) {
  try {
    const newReservation = await Reservation.create(reservationData);
    return newReservation;
  } catch (error) {
    console.error('Error saving reservation:', error);
    throw error;
  }
};

// Static method to fetch all reservations
Reservation.fetchAll = async function() {
  try {
    const reservations = await Reservation.findAll();
    return reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

module.exports = Reservation;
