# Rapid Car Booking - Car Rental System

A full-stack car rental system designed to streamline the process of booking vehicles online. The application features a responsive Angular frontend, a robust Spring Boot backend, MySQL database, and JWT-based authentication for secure user access.

![Rapid Car Booking Demo](demo.gif) <!-- Add a demo image/gif if available -->

## Features

- **JWT Authentication & Authorization**: Secure user login and role-based access (Admin/Customer).
- **Car Management** (Admin):
  - Add, update, or remove cars from the system.
  - View booking history and manage availability.
- **Booking System** (Customer):
  - Browse available cars with filters (price, model, dates).
  - Book cars for specific time periods.
  - View booking history and cancel/reschedule bookings.
- **Search & Filtering**: Customers can search cars by model, price range, or availability dates.
- **Payment Integration**: Simulated payment gateway for booking confirmation (e.g., Stripe).
- **User Profile Management**: Update personal details and view booking history.

## Technologies Used

- **Frontend**: Angular, TypeScript, HTML/SCSS
- **Backend**: Spring Boot, Java, Spring Security, Spring Data JPA
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Tools**: Postman, Maven, npm, Git

## Installation

### Prerequisites
- Node.js (v16+)
- Java JDK (17+)
- MySQL (8.0+)
- Angular CLI (`npm install -g @angular/cli`)
- Maven

### Backend Setup (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rapid-car-booking.git
   cd rapid-car-booking/backend
