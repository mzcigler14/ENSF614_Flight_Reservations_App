/*
 *  File Name: SeatState.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: SeatState entity used to transport the state of a seat on a certain flight.
 * Usually passed as a list
 */
package com.Flight614.flightreservations.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class SeatState {
    @Id
    private String seatN;
    private Integer rowN;
    private Integer colN;
    private double price;
    private String typedescription;
    private boolean available;


}
