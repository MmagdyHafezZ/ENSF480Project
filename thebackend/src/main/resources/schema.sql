DROP TABLE IF EXISTS `airportdata`;

CREATE TABLE
    IF NOT EXISTS `airportdata` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `iata` VARCHAR(3) NOT NULL,
        `city` VARCHAR(50) NOT NULL,
        `state` VARCHAR(50) NOT NULL,
        `country` VARCHAR(2) NOT NULL,
        PRIMARY KEY (`id`)
    );

DROP TABLE IF EXISTS `aircraftmodel`;

CREATE TABLE
    IF NOT EXISTS `aircraftmodel` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `model` VARCHAR(50),
        `modelid` VARCHAR(10) NOT NULL,
        `seatcapacity` INT UNSIGNED,
        `rownumber` INT UNSIGNED,
        `columnnumber` INT UNSIGNED,
        PRIMARY KEY (`id`)
    );

DROP TABLE IF EXISTS `region`;

CREATE TABLE
    IF NOT EXISTS `region` (
        `id`        BIGINT NOT NULL AUTO_INCREMENT,
        `city`      VARCHAR(50) NOT NULL,
        `state`     VARCHAR(50) NOT NULL,
        `country`   VARCHAR(2) NOT NULL,
        PRIMARY KEY(`id`)
    );

DROP TABLE IF EXISTS `airportlocation`;

CREATE TABLE 
    IF NOT EXISTS `airportlocation` (
	`id` 				BIGINT NOT NULL AUTO_INCREMENT,
    `iata`				VARCHAR(3) NOT NULL,
    `parentregionid`	INT NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `flightlist`;

DROP TABLE IF EXISTS `searchbooking`;

CREATE TABLE    
    IF NOT EXISTS `searchbooking` (
    `id`            BIGINT NOT NULL AUTO_INCREMENT,
    `iataorigin`    VARCHAR(3) NOT NULL,
    `iatadest`      VARCHAR(3) NOT NULL,
    `travellers`    INT NOT NULL,
    `departing`     VARCHAR(50) NOT NULL,
    `returning`     VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE 
    IF NOT EXISTS `flightlist` (
    `id`                BIGINT NOT NULL AUTO_INCREMENT,
    `searchbookingid`   BIGINT NOT NULL,
    `iataorigin`        VARCHAR(3) NOT NULL,
    `iatadest`          VARCHAR(3) NOT NULL,
    `departdate`        VARCHAR(50) NOT NULL,
    `returndate`        VARCHAR(50) NOT NULL,
    `departtime`        VARCHAR(50) NOT NULL,
    `returntime`        VARCHAR(50) NOT NULL,
    `model`             VARCHAR(50) NOT NULL,
    `modelid`           VARCHAR(10) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`searchbookingid`) REFERENCES `searchbooking`(`id`)
);
CREATE TABLE
    IF NOT EXISTS `aircraftmodel` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `model` VARCHAR(50),
        `modelid` VARCHAR(10) NOT NULL,
        `seatcapacity` INT UNSIGNED,
        `rownumber` INT UNSIGNED,
        `columnnumber` INT UNSIGNED,
        PRIMARY KEY (`id`)
    );
CREATE TABLE IF NOT EXISTS `list_of_seats` (
    id VARCHAR(255) PRIMARY KEY,   -- Composite ID made up of row and number (e.g., A1, B5)
    flight_id BIGINT NOT NULL,     -- Foreign key to the flights table
    seat_type VARCHAR(50),         -- Seat type (business, comfort, ordinary)
    seat_availability BOOLEAN NOT NULL, -- Seat availability status
    seat_id VARCHAR(255) NOT NULL, 
    FOREIGN KEY (flight_id) REFERENCES list_of_flights(id) -- Foreign key constraint
);