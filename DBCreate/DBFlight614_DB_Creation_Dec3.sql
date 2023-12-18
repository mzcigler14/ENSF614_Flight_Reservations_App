/*
 *  File Name: Database_Entries_Dec3.sql
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler, Yaad Sra, Kate Reimann
 * Description: SQL script to create the database
 */

DROP DATABASE FlightReservations_db;
CREATE DATABASE FlightReservations_db;
USE FlightReservations_db;

CREATE TABLE USER (
		UserID varchar(20) PRIMARY KEY,
		UserPassword varchar(20) not null,
		UserRole INT, #(2: customer, 3: airlineagent, 4: employee, 5: admin)
		LegalName VARCHAR(50),
		DOB DATE,
		Email VARCHAR(100),
		PhoneNumber VARCHAR(25)
) AUTO_INCREMENT= 10001;

CREATE TABLE InsuranceTiers (
    TierID INT PRIMARY KEY,
    TierName VARCHAR(50),
    CoverageAmount DECIMAL(10, 2)
);


CREATE TABLE Passenger (
		PassengerID INT AUTO_INCREMENT,
		LegalName VARCHAR(100),
		DOB DATE,
		Email VARCHAR(100),
		InsurancePolicyNumber INT,
		PhoneNumber VARCHAR(25),
		IsRegistered BOOLEAN DEFAULT FALSE,
		UserID varchar(20),
		PRIMARY KEY (PassengerID),
		FOREIGN KEY (USERID) REFERENCES User(UserID) ON UPDATE CASCADE ON DELETE SET NULL
) AUTO_INCREMENT = 10001;


CREATE TABLE Airline (
		AirlineID varchar(6) PRIMARY KEY,
		AirlineName VARCHAR(50),
		ContactEmail VARCHAR(100) UNIQUE,
		ContactPhone VARCHAR(25)
);

CREATE TABLE AirCraft (
    	AirCraftID INT PRIMARY KEY,
    	AirCraftType VARCHAR(25),
        AirlineID varchar(6),
		FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Flight (
    	FlightID INT PRIMARY KEY  AUTO_INCREMENT,
        AirlineID varchar(6),
    	DepTime TIME,
    	DepDate DATE,
    	Origin VARCHAR(30),
    	Destination VARCHAR(30),
    	AirCraftID INT,
		BasePrice DECIMAL(10,2),
		Status VARCHAR(50), # i.e 'On Schedule', 'Cancelled', etc.
    	FOREIGN KEY (AirCraftID) REFERENCES Aircraft(AirCraftID) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID) ON UPDATE CASCADE ON DELETE CASCADE
) AUTO_INCREMENT = 10001;


	
CREATE TABLE Seat (
	
    	SeatN varchar(3),
        RowN INT,
        ColN INT,
        AirCraftID INT,
		TypeDescription VARCHAR(50),
    	PriceMultiplier DECIMAL(3,2), #FOR 'Ordinary' -> 1.00, 'Comfort' -> 1.40, 'Business-Class' -> 2.00
		PRIMARY KEY (SeatN, AirCraftID),
        FOREIGN KEY (AirCraftID) REFERENCES Aircraft(AirCraftID)
);

CREATE TABLE Ticket (
		TicketID INT AUTO_INCREMENT PRIMARY KEY,
    	PassengerID INT,
		FlightID INT,
    	SeatN varchar(3),
    	FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID) ON UPDATE CASCADE ON DELETE SET NULL,
    	FOREIGN KEY (FlightID) REFERENCES Flight(FlightID) ON UPDATE CASCADE ON DELETE SET NULL,
    	FOREIGN KEY (SeatN) REFERENCES Seat(SeatN) ON UPDATE CASCADE ON DELETE SET NULL
) AUTO_INCREMENT = 10001;


CREATE TABLE Crew (
		FlightID INT,
    	UserID varchar(20),
    	PRIMARY KEY (FlightID, UserID),
    	FOREIGN KEY (FlightID) REFERENCES Flight(FlightID) ON UPDATE CASCADE ON DELETE CASCADE,
    	FOREIGN KEY (UserID) REFERENCES User(UserID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Receipt (
    	PaymentID INT PRIMARY KEY AUTO_INCREMENT,
		CardType VARCHAR(50), # ie 'Credit Card' 
    	CardNumber VARCHAR(16),
        PaymentDate DATE,
    	Pin VARCHAR(3),
        Expiry varchar(7),
        PostalCode varchar(6),
		TicketID INT,
        Amount decimal(10, 2),
		FOREIGN KEY (TicketID) REFERENCES Ticket(TicketID) ON UPDATE CASCADE ON DELETE CASCADE
)AUTO_INCREMENT=10001;

CREATE TABLE Promotion (
    	PromotionID INT PRIMARY KEY AUTO_INCREMENT,
    	Description VARCHAR(255),
    	DiscountPercentage DECIMAL(5,2)
);

DELIMITER //
CREATE PROCEDURE getUserFlights(IN user_id varchar(20), user_role INT)
	BEGIN
		IF user_role = 2 THEN
			SELECT * from FLIGHT as F WHERE F.FlightID IN 
            (SELECT FlightID FROM TICKET WHERE PassengerID IN 
            (SELECT PassengerID FROM Passenger AS P WHERE P.UserID = user_id));
        END IF;
        
        IF user_role = 4 THEN
			SELECT * from FLIGHT as F WHERE F.FlightID in 
            (SELECT FlightID FROM Crew AS C WHERE C.UserID = user_id);
        END IF;
        
	END //
    
    
    
