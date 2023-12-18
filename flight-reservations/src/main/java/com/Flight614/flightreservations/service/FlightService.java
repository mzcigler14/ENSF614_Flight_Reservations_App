/*
 *  File Name: FlightService.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Flight service which completes any complex data
 * manipulation (anything NOT just straight from the DB to endpoint and vice versa)
 */
package com.Flight614.flightreservations.service;

import com.Flight614.flightreservations.entity.*;
import com.Flight614.flightreservations.repository.FlightRepository;
import com.Flight614.flightreservations.repository.QueryRepository;
import com.Flight614.flightreservations.repository.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private QueryRepository queryRepository;
    @Autowired
    private TicketRepository ticketRepository;
    public List<Flight> allFlights(){
        return flightRepository.findAll();
    }
    public List<Flight> originFlights(String Origin, String Destination, Date DepDate){
        return flightRepository.findByOriginAndDestinationAndDepdate(Origin, Destination, DepDate);
    }

    @Transactional
    public List<Flight> getFlightsByUser(String UserID, Integer UserRole){
        return flightRepository.getUserFlights(UserID, UserRole);
    }

    @Transactional
    public SeatShape getSeatMapByFlightID(Integer FlightID){
        HashMap<Integer, Integer> SeatMap = new HashMap<Integer, Integer>();
        List<Seat> allSeats = queryRepository.findAllSeatsByFlightid(FlightID);
        for(Seat seat : allSeats) {
            int row = seat.getRowN();
            if (SeatMap.containsKey(row)){
                SeatMap.put(row, SeatMap.get(row)+1);
            }else {SeatMap.put(row, 1);}
        }

        SeatShape shape = new SeatShape(SeatMap.size(), SeatMap.get(1));
        return shape;
    }

    @Transactional
    public void deleteTicketByUserIDAndFlightID(String userid, Integer flightid){
        Ticket ticket = queryRepository.findTicketByUserIDAndFlightID(userid, flightid);
        ticketRepository.delete(ticket);
    }

    @Transactional
    public boolean isBookedUserFlight(String userid, Integer flightid){
        Ticket ticket = queryRepository.findTicketByUserIDAndFlightID(userid, flightid);
        return ticket != null;
    }

    @Transactional
    public List<SeatState> getSeatStates(Integer FlightID){
        List<Seat> allSeats = queryRepository.findAllSeatsByFlightid(FlightID);
        List<SeatState> states = new ArrayList<SeatState>();
        List<Ticket> tickets = ticketRepository.findTicketByFlightid(FlightID);
        Flight flight = flightRepository.findByFlightid(FlightID);
        for(Seat seat : allSeats){
            String seatNum = seat.getSeatN();
            SeatState state = new SeatState(seatNum, seat.getRowN(),
                    seat.getColN(),
                    seat.getPricemultiplier()*flight.getBaseprice(),
                    seat.getTypedescription(), findTicketBySeatNumber(tickets, seatNum));
            states.add(state);
        }
        return states;
    }
    private boolean findTicketBySeatNumber(List<Ticket> tickets, String seatNum) {
        if (tickets.isEmpty()) {
            return true;
        } else {
            for (Ticket ticket : tickets) {
                if (ticket.getSeatN().equals(seatNum)) {
                    return false;
                }
            }
            return true;
        }
    }

}
