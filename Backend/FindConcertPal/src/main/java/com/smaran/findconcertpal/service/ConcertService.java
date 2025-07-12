package com.smaran.findconcertpal.service;


import com.smaran.findconcertpal.dto.ConcertDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserConcert;

import java.util.List;

public interface ConcertService {
    List<UserConcert> userMatchingConcerts(User user) throws Exception;
    void addUserConcertToGoing(Long userId, String concertId) throws Exception;
    void userConcertNotGoing(Long userId, String concertId) throws Exception;
}
