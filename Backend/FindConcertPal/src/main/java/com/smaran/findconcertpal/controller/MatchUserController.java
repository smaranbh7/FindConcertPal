package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.service.MatchUserService;
import com.smaran.findconcertpal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchUserController {

    @Autowired
    MatchUserService matchUserService;

    @Autowired
    UserService userService;


    @GetMapping
    public ResponseEntity<List<UserDTO>> getMatchingUsers(
            @AuthenticationPrincipal UserDetails userDetails
            ) throws Exception{
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userService.findUserByEmail(userDetails.getUsername());
        List<UserDTO> users = matchUserService.matchingUsers(user);

        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
