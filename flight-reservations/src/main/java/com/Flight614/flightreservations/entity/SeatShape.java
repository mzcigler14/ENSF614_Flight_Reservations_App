/*
 *  File Name: SeatShape.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: SeatShape entity used to transport the grid size of seats
 * on the certain flight data.
 */
package com.Flight614.flightreservations.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class SeatShape {
    @Id
    private Integer nrows;
    private Integer ncols;


}
