package com.smaran.findconcertpal.service.implementation;

import com.smaran.findconcertpal.dto.ConcertDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserConcert;
import com.smaran.findconcertpal.repo.UserConcertRepo;
import com.smaran.findconcertpal.service.ConcertService;
import com.smaran.findconcertpal.service.TicketmasterService;
import com.smaran.findconcertpal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcertServiceImpl implements ConcertService {

    @Autowired
    UserService userService;

    @Autowired
    TicketmasterService ticketmasterService;

    @Autowired
    UserConcertRepo userConcertRepo;

    @Override
    public void addConcertToUser(Long userId, String concertId) throws Exception {
        User user = userService.findUserById(userId);
        List<ConcertDTO> availableConcerts = ticketmasterService.getConcertsByUserPreferences(user);
        
        boolean concertFound = false;
        for (ConcertDTO concert : availableConcerts) {
            if (concert.getConcertId().equals(concertId)) {
                UserConcert userConcert = new UserConcert();
                userConcert.setUser(user);
                userConcert.setConcertId(concertId);
                userConcert.setTitle(concert.getTitle());
                userConcert.setDate(concert.getDate());
                userConcert.setVenue(concert.getVenue());
                userConcert.setImageUrl(concert.getImageUrl());
                userConcert.setStatus(UserConcert.AttendanceStatus.GOING);
                userConcertRepo.save(userConcert);
                concertFound = true;
                break;
            }
        }
        
        if (!concertFound) {
            throw new Exception("Concert not found in available concerts!");
        }
    }
}
