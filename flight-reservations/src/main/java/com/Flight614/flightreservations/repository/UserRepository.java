/*
 *  File Name: UserRepository.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: User repository which queries the database, for simple single
 * table user queries
 */

package com.Flight614.flightreservations.repository;

import com.Flight614.flightreservations.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository

public interface UserRepository extends JpaRepository<User, String> {
    User findByUseridAndUserpassword(String userid, String userPassword);
    User findByUserid(String userid);

    void deleteByUserid(String userid);
}
