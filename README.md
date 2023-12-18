# Development

### Youtube Link:

https://www.youtube.com/watch?v=0aw5as_f0C4

### Brief Description:

Flight reservation app, implemented users include:

Guest user: browse flights, book flights, create account

Registered Customer: view booked flights, cancel flights, book flights

Travel Agent: Browse flights and passengers on each flight

Crew member: view registered flights and passengers on each flight, browse flights and passengers on each flight

This project was for an advanced system design class.  
Used a React/Typescript front end using the Bootstrap library.
Used a Springboot/Java backend.
Used a MySQL database. 

React, Typescript, and Springboot were learned from scratch to complete this project.


## Instuctions for running the program.

First unzip the development folder.

### Creating the database (FlightAppCode/DBCreate):

Development/DBCreate/DBFlight614_DB_Creation_Dec3.sql
run the above sql script to create the db

Development/DBCreate/Database_Entries_Dec3.sql
run the above sql script to create the base entries in the database

### Running the backend (FlightAppCode\flight-reservations)

open the folder FlightAppCode\flight-reservations in the IDE of your choosing (I use IntelliJ)

Open the following file:
FlightAppCode\flight-reservations\src\main\resources\application.properties
In this file you need to change the
spring.datasource.url = jdbc:mysql://localhost:3306/FlightReservations_db
spring.datasource.username= 614
spring.datasource.password= password614
to the url, username, and password to access the database you createed on your computor

One you have completed this run the flight-reservations folder to to run the backend and create
the endpoints.

### Running the frontend (FlightAppCode\ENSF614_FlightApp)

Open:
FlightAppCode\ENSF614_FlightApp
folder in your favorite IDE (I use VSCode for this part)
run the following commands

npm install
npm run dev

then click the link it creates
