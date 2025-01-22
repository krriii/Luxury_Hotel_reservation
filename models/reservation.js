
let reservations = []; 
module.exports = class Reservation {
    constructor(name, email, roomType, checkInDate, checkOutDate, totalPrice) {
        this.name = name;
        this.email = email;
        this.roomType = roomType;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalPrice = totalPrice;
    }

    
    save() {
        reservations.push(this);
    }

    static fetchAll() {
        console.log(reservations);
        return reservations;
    }
};
