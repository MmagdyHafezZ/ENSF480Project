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
        PRIMARY KEY (`id`)
        -- CONSTRAINT FK_AircraftModel FOREIGN KEY (`id`) REFERENCES `aircraftmodel` (`id`) ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS `region` (
        `id`        BIGINT NOT NULL AUTO_INCREMENT,
        `city`      VARCHAR(50) NOT NULL,
        `state`     VARCHAR(50) NOT NULL,
        `country`   VARCHAR(2) NOT NULL,
        PRIMARY KEY(`id`)
        -- CONSTRAINT FK_RegionCity FOREIGN KEY (`city`) REFERENCES `airportdata` (`city`) ON UPDATE CASCADE,
        -- CONSTRAINT FK_RegionState FOREIGN KEY (`state`) REFERENCES `airportdata` (`state`) ON UPDATE CASCADE,
        -- CONSTRAINT FK_RegionCountry FOREIGN KEY (`country`) REFERENCES `airportdata` (`country`) ON UPDATE CASCADE
    );

CREATE TABLE 
    IF NOT EXISTS `airportlocation` (
	`id` 				BIGINT NOT NULL AUTO_INCREMENT,
    `iata`				VARCHAR(3) NOT NULL,
    `parentregionid`	INT NOT NULL,
    PRIMARY KEY (`parentregionid`)
    -- CONSTRAINT FK_iataCode FOREIGN KEY (`iata`)
    -- REFERENCES `airportdata`(`iata`) ON UPDATE CASCADE
    -- CONSTRAINT FK_ParentRegionID FOREIGN KEY (`parentregionid`)
    -- REFERENCES `region`(`id`) ON UPDATE CASCADE
);

CREATE TABLE    
    IF NOT EXISTS `searchbooking` (
    `id`            BIGINT NOT NULL AUTO_INCREMENT,
    `iataorigin`    VARCHAR(3) NOT NULL,
    `iatadest`      VARCHAR(3) NOT NULL,
    `travellers`    INT NOT NULL,
    `departing`     TIMESTAMP NOT NULL,
    `returning`     TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
    )