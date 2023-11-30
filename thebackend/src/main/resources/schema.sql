CREATE TABLE IF NOT EXISTS `airportdata` (
    `id`        BIGINT NOT NULL AUTO_INCREMENT,
    `iata`      VARCHAR(3) NOT NULL,
    `city` 		VARCHAR(100) NOT NULL,
    `state`    	VARCHAR(100) NOT NULL,
    `country`  	VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `aircraftmodel` (
	`id`			    BIGINT NOT NULL AUTO_INCREMENT,
    `model`			    VARCHAR(50),
    `seatcapacity`	    INT UNSIGNED,
    `rownumber`			INT UNSIGNED,
    `columnnumber`		INT UNSIGNED,
    CONSTRAINT UC_Model	UNIQUE (`model`),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `aircraft` (
	`id`		BIGINT NOT NULL AUTO_INCREMENT,
    `modelid`	INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FK_AircraftModel FOREIGN KEY (`modelid`)
    REFERENCES `aircraftmodel`(`id`) ON UPDATE CASCADE
);