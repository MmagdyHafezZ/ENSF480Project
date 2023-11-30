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
    google_id VARCHAR(255) -- Unique ID from Google, NULL for regular users
);
INSERT INTO users (email, password, first_name, last_name) VALUES 
('johndoe@example.com', 'encrypted_password', 'John','Doe');


DROP TABLE IF EXISTS userProfile;
CREATE TABLE userProfile (
    id BIGINT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    userRole VARCHAR(255),
    membershipType ENUM('bronze', 'silver', 'gold'),
    loyaltyPoints INT DEFAULT 0,
    recentBookings TEXT,  -- This can be JSON or a delimited string
    upcomingFlights TEXT, -- This can be JSON or a delimited string
    emailNotification BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES users(id)
);
DROP TABLE IF EXISTS userCreditCard;
CREATE TABLE userCreditCard (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    userId BIGINT NOT NULL,
    cardNumber VARCHAR(255),
    expiryDate DATE,
    cvv VARCHAR(10),
    cardholderName VARCHAR(255),
    address TEXT,
    FOREIGN KEY (userId) REFERENCES userProfile(id)
);


CREATE TABLE IF NOT EXISTS `region` (
	`id`		INT NOT NULL AUTO_INCREMENT,
    `city`		VARCHAR(50) NOT NULL,
    `state`		VARCHAR(50) NOT NULL,
    `country` 	VARCHAR(2)	NOT NULL
);

CREATE TABLE IF NOT EXISTS `airport` (
	`id` 				INT NOT NULL AUTO_INCREMENT,
    `iata`				VARCHAR(3),
    `parentregionid`	INT NOT NULL,
    CONSTRAINT FK_ParentRegionID FOREIGN KEY (`parentregionid`)
    REFERENCES `region`(`id`) ON UPDATE CASCADE
);
	
CREATE TABLE IF NOT EXISTS `route` (
	`id`			INT NOT NULL AUTO_INCREMENT,
    `origin`		INT NOT NULL,
    `destination`	INT NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT FK_Origin FOREIGN KEY (`origin`)
    REFERENCES `airport`(`id`) ON UPDATE CASCADE,
    CONSTRAINT FK_Destination FOREIGN KEY (`destination`)
    REFERENCES `airport`(`id`) ON UPDATE CASCADE,
    CONSTRAINT UC_Route UNIQUE (`origin`, `destination`)
);

   
CREATE TABLE userPreferences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    userId BIGINT NOT NULL,
    mealPreference VARCHAR(255),
    seatPreference ENUM('aisle', 'window'),
    FOREIGN KEY (userId) REFERENCES userProfile(id)
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
