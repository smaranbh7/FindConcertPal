package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.dto.ConcertDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.repo.UserRepo;
import com.smaran.findconcertpal.service.TicketmasterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final TicketmasterService ticketmasterService;
    private final UserRepo userRepo;

    public DashboardController(TicketmasterService ticketmasterService, UserRepo userRepo){
        this.ticketmasterService=ticketmasterService;
        this.userRepo= userRepo;
    }

    @GetMapping
    public ResponseEntity<List<ConcertDTO>> getConcerts(
            @AuthenticationPrincipal UserDetails userDetails
    ) throws Exception{
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user= userRepo.findByEmail(userDetails.getUsername());
        if(user == null){
            throw new Exception("User not found");
        }

        List<ConcertDTO> concerts = ticketmasterService.getConcertsByUserPreferences(user);

        return new ResponseEntity<>(concerts,HttpStatus.OK);
    }
}
