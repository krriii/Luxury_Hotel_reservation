Hotel Reservation System

Project Description:
Luxury Hotel Reservation is as web-based hotel reservation system, built with Node.js for backend and Express.js for frontend rendering, allowing users to manage hotel room bookings. It provides full CRUD (Create, Read, Update, Delete) functionality for reservations, utilizing a MySQL database with Sequelize ORM for data persistence. The system features a user-friendly interface styled with Tailwind CSS and server-side rendering with EJS templates.

Key Features:
- Create new reservations
- View existing reservations
- Update reservation details
- Delete reservations
- Storing the reservation information in database
- Responsive design

Setup Instructions:
1. Clone the repository:
   git clone https://github.com/krriii/Luxury_Hotel_reservation
   cd hotel-reservation-system

2. Install dependencies:
   npm install mysql2 bcryptjs express-session connect-session-sequelize 
   npm install nodemon 
   npm install express ejs
   npm install body-parser


3. Set up the MySQL database:
   - Create a new MySQL database
   - Update the database configuration in config/database.js

4. Start the server:
   npm start

6. Access the application at http://localhost:3000

Usage Examples:

1. Creating a Reservation:
   - Navigate to the homepage and click "Make a Reservation"
   - Fill out the form with guest details, room type, and dates
   - Click "Submit" to create the reservation
   - You will be redirected to a confirmation page

2. Viewing Reservations:
   - All reservations are listed on the homepage
   - Click on a reservation to view its details

3. Updating a Reservation:
   - On the reservation details page, click "Edit"
   - Modify the reservation details in the form
   - Click "Update Reservation" to save changes

4. Deleting a Reservation:
   - On the reservation details page, click "Delete"
   - Confirm the deletion in the prompt
   - The reservation will be removed from the system

Note: Ensure that Node.js and MySQL are installed on your system before setting up the project. 
