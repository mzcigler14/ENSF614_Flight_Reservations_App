/*
 *  File Name: QueryRepository.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Repository which queries the database, for complex or multi-
 * table queries
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

public interface QueryRepository extends JpaRepository<Flight, Integer> {

    @Query (value = "SELECT  p  FROM Passenger p WHERE p.passengerID IN " +
            "(SELECT t.passengerid FROM Ticket t WHERE t.flightid = :flightid)")
    List<Passenger> findPassengersByFlightid(@Param("flightid") Integer flightid);

    @Query (value = "SELECT s FROM Seat s where s.aircraftid IN " +
            "(SELECT f.aircraftid FROM Flight f WHERE f.flightid = :flightid)")
    List<Seat> findAllSeatsByFlightid(@Param("flightid") Integer flightid);

    @Query (value = "SELECT t FROM Ticket t where t.flightid = :flightid and t.passengerid IN " +
            "(SELECT p.passengerID FROM Passenger p WHERE p.userid = :userid)")
    Ticket findTicketByUserIDAndFlightID(@Param("userid") String userid, @Param("flightid") Integer flightid);


}
