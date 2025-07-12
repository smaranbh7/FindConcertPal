package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.config.JwtProvider;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.repo.UserRepo;
import com.smaran.findconcertpal.service.TicketmasterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepo userRepo;

    public UserController(TicketmasterService ticketmasterService, UserRepo userRepo){
        this.userRepo= userRepo;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) throws Exception {
        String email = JwtProvider.getEmailFromToken(token);
        User user = userRepo.findByEmail(email);
        if(user == null) {
            throw new Exception("User not found");
        }
        return ResponseEntity.ok(user);
    }


}
