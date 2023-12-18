/*
 *  File Name: Passenger.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Passenger entity used to transport passenger data.
 */

package com.Flight614.flightreservations.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.sql.Date;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name= "Passenger")
@AllArgsConstructor
@NoArgsConstructor


public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "PassengerID")
    private Integer passengerID;
    private String legalname;
    private Date DOB;
    private String email;
    private Integer insurancepolicynumber;
    private String phonenumber;
    private boolean isregistered;
    private @Nullable String userid;


    public Passenger(String legalname, Date dob, String email, String phonenumber, Integer insurancepolicynumber, boolean isregistered, String userid) {
        this.legalname = legalname;
        this.DOB = dob;
        this.email = email;
        this.insurancepolicynumber = insurancepolicynumber;
        this.phonenumber = phonenumber;
        this.isregistered = isregistered;
        if(userid == null ||userid.isEmpty()){
            this.userid = null;
        }else {
            this.userid = userid;
        }



    }
}
