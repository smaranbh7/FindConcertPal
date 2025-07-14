package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.dto.UserMatchDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.response.ServerResponse;
import com.smaran.findconcertpal.service.MatchUserService;
import com.smaran.findconcertpal.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchUserController {

    final
    MatchUserService matchUserService;

    final
    UserService userService;

    public MatchUserController(MatchUserService matchUserService, UserService userService) {
        this.matchUserService = matchUserService;
        this.userService = userService;
    }


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

    @PostMapping
    public ResponseEntity<ServerResponse> sendMatchRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Long receiverId
    )throws Exception{
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userService.findUserByEmail(userDetails.getUsername());
        matchUserService.sendMatchRequest(user.getId(), receiverId);

        ServerResponse response = new ServerResponse("Request sent to user successfully!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/receivedRequests")
    public ResponseEntity<List<UserMatchDTO>> getMatchRequests(
            @AuthenticationPrincipal UserDetails userDetails
    ) throws Exception {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userService.findUserByEmail(userDetails.getUsername());
        List<UserMatchDTO> userDTOS = matchUserService.getMatchRequests(user);

        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @PostMapping("/receivedRequests/accept")
    public ResponseEntity<ServerResponse> acceptMatchRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Long userMatchId
    ) throws Exception{
        if(userDetails == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userService.findUserByEmail(userDetails.getUsername());
        matchUserService.acceptMatchRequest(user, userMatchId);

        ServerResponse response = new ServerResponse("User Matched Successfully!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
