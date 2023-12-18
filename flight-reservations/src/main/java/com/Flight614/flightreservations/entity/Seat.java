/*
 *  File Name: Seat.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Seat entity used to transport Seat data.
 */

package com.Flight614.flightreservations.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name= "Seat")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Seat {
    @Id
    private String seatN;
    private Integer rowN;
    private Integer colN;
//    @Column(name = "AirCraftID")
    private Integer aircraftid;
    private String typedescription;
    private double pricemultiplier;

}
