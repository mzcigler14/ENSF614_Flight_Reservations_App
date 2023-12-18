/*
 *  File Name: FlightContoller.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Flight controller which sets endpoints for API calls for any flight
 * related api calls (ticket, passenger, flight, seat, etc.)
 * Complex calls are routed through the FlightService where any algorithms are
 * implemented, basic calls are routed directly to the Repository
 */


package com.Flight614.flightreservations.controller;

import com.Flight614.flightreservations.entity.*;
import com.Flight614.flightreservations.repository.*;
import com.Flight614.flightreservations.service.FlightService;
import com.Flight614.flightreservations.service.UserService;
import jakarta.annotation.Nullable;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins= "*")
@RestController
@RequestMapping("/api/v1/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private QueryRepository queryRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PassengerRepository passengerRepository;
    @Autowired
    private ReceiptRepository receiptRepository;
    @GetMapping
    public ResponseEntity<List<Flight>> getAllMovies(){
        return new ResponseEntity<List<Flight>>(flightService.allFlights(), HttpStatus.OK);
    }
    @GetMapping("/{Origin}/{Destination}/{DepDate}")
    public ResponseEntity<List<Flight>> getOriginFlight(@PathVariable String Origin,
                                                        @PathVariable String Destination,
                                                        @PathVariable Date DepDate) {
        return new ResponseEntity<List<Flight>>(flightService.originFlights(Origin, Destination, DepDate), HttpStatus.OK);
    }

    @GetMapping("/byuser/{UserID}/{UserRole}")
    public ResponseEntity<List<Flight>> getFlightsByUser(@PathVariable String UserID,
                                                         @PathVariable Integer UserRole){
        return new ResponseEntity<List<Flight>>(flightService.getFlightsByUser(UserID, UserRole), HttpStatus.OK);
    }

    @GetMapping("/passengerbyflight/{FlightID}")
    public ResponseEntity<List<Passenger>> getPassengersByFlightid(@PathVariable Integer FlightID){
        return new ResponseEntity<List<Passenger>>(queryRepository.findPassengersByFlightid(FlightID), HttpStatus.OK);
    }

    @GetMapping("/seatshapebyflight/{FlightID}")
    public ResponseEntity<SeatShape> getPlaneShapeByFlightid(@PathVariable Integer FlightID){
        return new ResponseEntity<SeatShape>(flightService.getSeatMapByFlightID(FlightID), HttpStatus.OK);
    }

    @GetMapping("/seatstatesbyflight/{FlightID}")
    public ResponseEntity<List<SeatState>> getSeatStatesByFlight(@PathVariable Integer FlightID){
        return new ResponseEntity<List<SeatState>>(flightService.getSeatStates(FlightID), HttpStatus.OK);
    }

    @GetMapping("/deleteticket/{UserID}/{FlightID}")
    public Boolean deleteTicket(@PathVariable String UserID, @PathVariable Integer FlightID) {
        Optional<User> userOptional = java.util.Optional.ofNullable(userService.userByID(UserID));
        Optional<Flight> flightOptional = java.util.Optional.ofNullable(flightRepository.findByFlightid(FlightID));
        if (userOptional.isPresent() && flightOptional.isPresent()) {
            flightService.deleteTicketByUserIDAndFlightID(UserID, FlightID);
            return true;
        }
        return false;
    }
    @GetMapping("/isbooked/{UserID}/{FlightID}")
    public Boolean isBooked(@PathVariable String UserID, @PathVariable Integer FlightID) {
        Optional<User> userOptional = java.util.Optional.ofNullable(userService.userByID(UserID));
        Optional<Flight> flightOptional = java.util.Optional.ofNullable(flightRepository.findByFlightid(FlightID));
        if (userOptional.isPresent() && flightOptional.isPresent()) {
            return flightService.isBookedUserFlight(UserID, FlightID);
        }
        return false;
    }

    @PostMapping("/addpassenger")
    public ResponseEntity<Passenger> createPassenger(@RequestBody Map<String, String> body) {
        String legalname = body.get("legalname");
        Date DOB = Date.valueOf(body.get("DOB"));
        String email = body.get("email");
        String phonenumber = body.get("phonenumber");
        Integer insurancepolicynumber = Integer.valueOf(body.get("insurancepolicynumber"));
        boolean isregistered = Boolean.parseBoolean(body.get("isregistered"));
        String userid = body.get("userid");
        Passenger newPassenger = new Passenger(legalname, DOB, email, phonenumber, insurancepolicynumber, isregistered, userid);
        return new ResponseEntity<Passenger>(passengerRepository.save(newPassenger), HttpStatus.OK);
    }

    @PostMapping("/addticket")
    public ResponseEntity<Ticket> createTicket(@RequestBody Map<String, String> body) {
        Integer passengerid = Integer.valueOf(body.get("passengerid"));
        Integer flightid = Integer.valueOf(body.get("flightid"));
        String seatN = body.get("seatN");
        Ticket newTicket = new Ticket(passengerid, flightid, seatN);
        return new ResponseEntity<Ticket>(ticketRepository.save(newTicket), HttpStatus.OK);
    }

    @PostMapping("/addreceipt")
    public ResponseEntity<Receipt> createReceipt(@RequestBody Map<String, String> body) {
        String cardnumber = body.get("cardnumber");
        String cardtype = (body.get("cardtype"));
        Date paymentdate = Date.valueOf(body.get("paymentdate"));
        String pin = body.get("pin");
        String expiry = body.get("expiry");
        String postalcode = body.get("postalcode");
        Integer ticketid = Integer.valueOf(body.get("ticketid"));
        double amount = Double.parseDouble(body.get("amount"));
        Receipt newReceipt = new Receipt(cardtype, cardnumber, paymentdate, pin, expiry, postalcode, ticketid, amount);
        return new ResponseEntity<Receipt>(receiptRepository.save(newReceipt), HttpStatus.OK);
    }
}
