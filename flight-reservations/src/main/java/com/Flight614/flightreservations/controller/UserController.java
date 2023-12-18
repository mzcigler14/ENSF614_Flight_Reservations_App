/*
 *  File Name: UserController.java
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Flight controller which sets endpoints for API calls for any user
 * related api calls (check credencial, create, update etc.)
 * Complex calls are routed through the UserService where any algorithms are
 * implemented, basic calls are routed directly to the Repository
 */


package com.Flight614.flightreservations.controller;

import com.Flight614.flightreservations.entity.User;
import com.Flight614.flightreservations.repository.UserRepository;
import com.Flight614.flightreservations.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


//@CrossOrigin(origins = "*", allowedHeaders = "*",
//        methods = {RequestMethod.GET, RequestMethod.POST,
//                RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }
    @GetMapping("/{UserID}/{UserPassword}")
    public ResponseEntity<User> getUser(@PathVariable String UserID,
                                        @PathVariable String UserPassword) {
        return new ResponseEntity<User>(userService.loginUser(UserID, UserPassword), HttpStatus.OK);
    }
    @DeleteMapping ("/remove/{userid}")
    public boolean deleteRow(@PathVariable("userid") String UserID){
        Optional<User> userOptional = Optional.ofNullable(userService.userByID(UserID));
        if(userOptional.isPresent()){
            userService.deleteUser(UserID);
            return true;
        }
        return false;
    }
    @PutMapping("/update/{userid}")
    public ResponseEntity<User> updateUser(@PathVariable("userid") String UserID, @RequestBody Map<String, String> body) {
        User current = userRepository.findByUserid(UserID);

        if (current != null) {
            // Update fields without changing the primary key
            current.setUserpassword(body.get("userpassword"));
            current.setUserrole(Integer.valueOf(body.get("userrole")));
            current.setLegalname(body.get("legalname"));
            current.setDOB(Date.valueOf(body.get("DOB")));
            current.setEmail(body.get("email"));
            current.setPhonenumber(body.get("phonenumber"));

            userRepository.save(current);
            return new ResponseEntity<User>(current, HttpStatus.OK);
        } else {
            // Handle the case where the user with the specified ID is not found
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("/checkavail/{userid}")
    public ResponseEntity<Boolean> userAvail(@PathVariable("userid") String UserID){
        return new ResponseEntity<Boolean>(userService.checkUserAvail(UserID), HttpStatus.OK);
    }



    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> body) {
        String userid = body.get("userid");
        String userpassword = body.get("userpassword");
        Integer userrole = Integer.valueOf(body.get("userrole"));
        String legalname = body.get("legalname");
        Date DOB = Date.valueOf(body.get("DOB"));
        String email = body.get("email");
        String phonenumber = body.get("phonenumber");
        User newUser = new User(userid, userpassword, userrole, legalname, DOB, email,
                phonenumber);
        return new ResponseEntity<User>(userRepository.save(newUser), HttpStatus.OK);
    }

}