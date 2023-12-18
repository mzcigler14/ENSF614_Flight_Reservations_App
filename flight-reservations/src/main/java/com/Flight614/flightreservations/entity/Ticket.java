/*
 *  File Name: Ticket.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Ticket entity used to transport ticket data.
 */
package com.Flight614.flightreservations.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@Table(name= "Ticket")
@AllArgsConstructor
@NoArgsConstructor


public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ticketid;
    private Integer passengerid;
    private Integer flightid;
    @Column(name= "Seatn")
    private String SeatN;


    public Ticket(Integer passengerid, Integer flightid, String seatN) {
        this.passengerid = passengerid;
        this.flightid = flightid;
        this.SeatN = seatN;
    }
}
