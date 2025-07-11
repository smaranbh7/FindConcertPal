package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.dto.ConcertDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.repo.UserRepo;
import com.smaran.findconcertpal.response.ServerResponse;
import com.smaran.findconcertpal.service.ConcertService;
import com.smaran.findconcertpal.service.TicketmasterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/concerts")
public class ConcertController {

    private final TicketmasterService ticketmasterService;
    private final UserRepo userRepo;
    private final ConcertService concertService;

    public ConcertController(TicketmasterService ticketmasterService, UserRepo userRepo, ConcertService concertService){
        this.ticketmasterService=ticketmasterService;
        this.userRepo= userRepo;
        this.concertService=concertService;
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

    @PostMapping("/{concertId}")
    public ResponseEntity<ServerResponse> addConcertToUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String concertId
    ) throws Exception{
        if(userDetails == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user= userRepo.findByEmail(userDetails.getUsername());
        concertService.addConcertToUser(user.getId(), concertId);
        ServerResponse serverResponse= new ServerResponse("Concert added to user");
        return new ResponseEntity<>(serverResponse, HttpStatus.OK);
    }
}
