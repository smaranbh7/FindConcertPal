package com.smaran.findconcertpal.service;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.dto.UserMatchDTO;
import com.smaran.findconcertpal.model.User;

import java.util.List;

public interface MatchUserService {
    List<UserDTO> matchingUsers(User user) throws Exception;
    List<UserDTO> usersGoingSameConcerts(String concertId ) throws Exception;
    void sendMatchRequest(Long senderId, Long receiverId) throws Exception;
    void acceptMatchRequest(User user, Long userMatchId) throws Exception;
    List<UserMatchDTO> receivedMatchingRequests(User user) throws Exception;
}
