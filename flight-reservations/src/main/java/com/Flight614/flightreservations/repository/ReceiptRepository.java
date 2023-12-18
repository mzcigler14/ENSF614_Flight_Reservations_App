/*
 *  File Name: ReceiptRepository.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Receipt repository which queries the database, for simple single
 * table receipt queries
 */
package com.Flight614.flightreservations.repository;

import com.Flight614.flightreservations.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ReceiptRepository extends JpaRepository<Receipt, String> {
    Receipt findByPaymentid(Integer paymentid);
}
