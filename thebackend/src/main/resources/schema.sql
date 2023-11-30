CREATE TABLE  IF NOT EXISTS airportdata (
    id        BIGINT NOT NULL AUTO_INCREMENT,
    iata      VARCHAR(3) NOT NULL,
    city 		VARCHAR(100) NOT NULL,
    state    	VARCHAR(100) NOT NULL,
    country  	VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);