/*
 *  File Name: UserService.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: User service which completes any complex data
 * manipulation (anything NOT just straight from the DB to endpoint and vice versa)
 */
package com.Flight614.flightreservations.service;

import com.Flight614.flightreservations.entity.User;
import com.Flight614.flightreservations.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public List<User> allUsers(){
        return userRepository.findAll();
    }
    public User loginUser(String UserID, String UserPassword){
        return userRepository.findByUseridAndUserpassword(UserID, UserPassword);
    }

    public User userByID(String UserID){
        return userRepository.findByUserid(UserID);
    }
    @Transactional
    public void deleteUser(String UserID){
        userRepository.deleteByUserid(UserID);
    }

    @Transactional
    public Boolean checkUserAvail(String UserID) {
        return userRepository.findByUserid(UserID) == null;

    }
}
