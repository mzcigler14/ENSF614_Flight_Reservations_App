/*
 *  File Name: TicketRepository.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Ticket repository which queries the database, for simple single
 * table ticket queries
 */
package com.Flight614.flightreservations.repository;

import com.Flight614.flightreservations.entity.Flight;
import com.Flight614.flightreservations.entity.Passenger;
import com.Flight614.flightreservations.entity.Seat;
import com.Flight614.flightreservations.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findTicketByFlightid(Integer flightid);

}
