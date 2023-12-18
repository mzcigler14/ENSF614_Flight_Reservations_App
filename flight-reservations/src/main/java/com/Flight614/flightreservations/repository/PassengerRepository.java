/*
 *  File Name: PassengerRepository.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Passenger repository which queries the database, for simple single
 * table passenger queries
 */

package com.Flight614.flightreservations.repository;

import com.Flight614.flightreservations.entity.Passenger;
import com.Flight614.flightreservations.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PassengerRepository extends JpaRepository<Passenger, String> {
    Passenger findByPassengerID(Integer passengerID);
}
