/*
 *  File Name: FlightRepository.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Flight repository which queries the database, for simple single table flight
 * queries
 */

package com.Flight614.flightreservations.repository;

import com.Flight614.flightreservations.entity.Flight;
import com.Flight614.flightreservations.entity.Passenger;
import com.Flight614.flightreservations.entity.Ticket;
import com.Flight614.flightreservations.entity.Seat;
import jakarta.persistence.Id;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Repository

public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findByOriginAndDestinationAndDepdate(String origin, String destination, Date depdate);

    Flight findByFlightid(Integer FlightID);

    @Procedure(name = "getUserFlights")
    List<Flight> getUserFlights(String user_id, Integer user_role);

}
