package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.config.JwtProvider;
import com.smaran.findconcertpal.dto.ProfileDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.repo.UserRepo;
import com.smaran.findconcertpal.response.ServerResponse;
import com.smaran.findconcertpal.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepo userRepo;

    final
    UserService userService;

    public UserController(UserRepo userRepo, UserService userService){
        this.userRepo= userRepo;
        this.userService = userService;
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

    @PutMapping("/profile/edit")
    public ResponseEntity<ServerResponse> updateUserProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileDTO profileDetails
            ) throws Exception{
        if(userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
            User user = userRepo.findByEmail(userDetails.getUsername());
            userService.updateUserDetails(user.getId(), profileDetails);

            ServerResponse response = new ServerResponse("User details updated successfully!!");

            return ResponseEntity.ok(response);

    }


}
