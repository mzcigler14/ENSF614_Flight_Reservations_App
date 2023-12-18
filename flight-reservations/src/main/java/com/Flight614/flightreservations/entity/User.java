/*
 *  File Name: User.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: User entity used to transport user data.
 */
package com.Flight614.flightreservations.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class User {
    @Id
    private String userid;
    private String userpassword;
    private Integer userrole;
    private String legalname;
    private Date DOB;
    private String email;
    private String phonenumber;
}
