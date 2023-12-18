/*
 *  File Name: Receipt.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Receipt entity used to transport receipt data.
 */
package com.Flight614.flightreservations.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@Table(name= "Receipt")
@AllArgsConstructor
@NoArgsConstructor


public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "PaymentID")
    private Integer paymentid;
    @Column(name= "Cardtype")
    private String cardtype;
    @Column(name= "Cardnumber")
    private String cardnumber;
    @Column(name= "Paymentdate")
    private Date paymentdate;
    @Column(name= "Pin")
    private String pin;
    @Column(name= "Expiry")
    private String expiry;
    @Column(name= "Postalcode")
    private String postalcode;
    @Column(name= "Ticketid")
    private Integer ticketid;
    @Column(name= "Amount")
    private double amount;


    public Receipt(String cardtype,  String cardnumber, Date paymentdate, String pin, String expiry
            , String postalcode, Integer ticketid, double amount) {
        this.cardtype = cardtype;
        this.cardnumber = cardnumber;
        this.paymentdate = paymentdate;
        this.pin = pin;
        this.expiry = expiry;
        this.postalcode = postalcode;
        this.ticketid = ticketid;
        this.amount = amount;



    }
}
