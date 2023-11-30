CREATE TABLE
    IF NOT EXISTS `airportdata` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `iata` VARCHAR(3) NOT NULL,
        `city` VARCHAR(50) NOT NULL,
        `state` VARCHAR(50) NOT NULL,
        `country` VARCHAR(2) NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    IF NOT EXISTS `aircraftmodel` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `model` VARCHAR(50),
        `seatcapacity` INT UNSIGNED,
        `rownumber` INT UNSIGNED,
        `columnnumber` INT UNSIGNED,
        CONSTRAINT UC_Model UNIQUE (`model`),
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    IF NOT EXISTS `aircraft` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `modelid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT FK_AircraftModel FOREIGN KEY (`modelid`) REFERENCES `aircraftmodel` (`id`) ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `region` (
        `id` BIGINT NOT NULL AUTO_INCREMENT,
        `city` VARCHAR(50) NOT NULL,
        `state` VARCHAR(50) NOT NULL,
        `country` VARCHAR(2) NOT NULL,
        CONSTRAINT FK_RegionCity FOREIGN KEY (`city`) REFERENCES `airportdata` (`city`) ON UPDATE CASCADE,
        CONSTRAINT FK_RegionState FOREIGN KEY (`state`) REFERENCES `airportdata` (`state`) ON UPDATE CASCADE,
        CONSTRAINT FK_RegionCountry FOREIGN KEY (`country`) REFERENCES `airportdata` (`country`) ON UPDATE CASCADE
    );