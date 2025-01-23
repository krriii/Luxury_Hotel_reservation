class Reservation {
    // Private reservations array
    static #reservations = [];

    constructor(name, email, roomType, checkInDate, checkOutDate,totalPrice) {
        this.name = name;
        this.email = email;
        this.roomType = roomType;
        this.checkInDate = new Date(checkInDate);
        this.checkOutDate = new Date(checkOutDate);
        this.totalPrice = totalPrice;
    }

    // Getter for reservations
    static get reservations() {
        return Reservation.#reservations;
    }

    // Method to save a reservation
    save() {
        Reservation.#reservations.push(this);
    }

  

    // Static method to fetch all reservations
    static fetchAll() {
        return Reservation.#reservations;
    }

 
   
}

// Export the model
module.exports = Reservation;
