/*
 *  File Name: Flight.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Flight entity used to transport flight data.
 */

package com.Flight614.flightreservations.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name= "Flight")
@AllArgsConstructor
@NoArgsConstructor

public class Flight {
    @Id
    private Integer flightid;
    private String airlineid;
    private Time deptime;
    private Date depdate;
    private String origin;
    private String destination;
//    @Column(name = "AirCraftID")
    private Integer aircraftid;
    private double baseprice;


}
