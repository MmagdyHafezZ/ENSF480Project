DROP database IF EXISTS 480base;

CREATE DATABASE IF NOT EXISTS 480base;

USE 480base;

DROP TABLE IF exists users;
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255), -- NULL for Google OAuth users
    google_id VARCHAR(255), -- Unique ID from Google, NULL for regular users
    membershipType ENUM('Basic', 'Bronze', 'Silver','Gold'),
    
);
INSERT INTO users (email, password, first_name, last_name) VALUES 
('johndoe@example.com', 'encrypted_password', 'John','Doe');


DROP TABLE IF EXISTS user_profile;
CREATE TABLE user_profile (
    id BIGINT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    userRole VARCHAR(255),
    membershipType ENUM('Basic', 'Bronze', 'Silver','Gold'),
    loyaltyPoints INT DEFAULT 0,
    recentBookings TEXT,  -- This can be JSON or a delimited string
    upcomingFlights TEXT, -- This can be JSON or a delimited string
    emailNotification BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES users(id)
);
DROP TABLE IF EXISTS user_credit_card;
CREATE TABLE user_credit_card (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,  -- Changed from userId to user_id to match foreign key reference
    card_number VARCHAR(255),
    expiry_date VARCHAR(7),
    cvv VARCHAR(10),
    cardholder_name VARCHAR(255),
    address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);



   
CREATE TABLE userPreferences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    userId BIGINT NOT NULL,
    mealPreference VARCHAR(255),
    seatPreference ENUM('aisle', 'window'),
	FOREIGN KEY (user_id) REFERENCES users(id)
);	

DROP TABLE IF EXISTS managebooking;
CREATE TABLE managebooking (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    departure_airport VARCHAR(3),
    arrival_airport VARCHAR(3),
    confirm VARCHAR(20),
    seat VARCHAR(10),
    meal VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (departure_airport) REFERENCES airportdata(iata),
    FOREIGN KEY (arrival_airport) REFERENCES airportdata(iata)
);

INSERT INTO managebooking (user_id, departure_airport, arrival_airport, confirm, seat, meal) VALUES
(1, 'JFK', 'LAX', 'Confirmed', '10F', 'Vegetarian');