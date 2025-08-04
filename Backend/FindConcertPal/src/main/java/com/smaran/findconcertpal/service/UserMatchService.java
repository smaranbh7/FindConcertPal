package com.smaran.findconcertpal.service;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.dto.UserMatchDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserMatch;

import java.util.List;

public interface UserMatchService {
    List<UserDTO> matchingUsers(User user) throws Exception;
    List<UserDTO> usersGoingSameConcerts(String concertId ) throws Exception;
    void sendMatchRequest(Long senderId, Long receiverId) throws Exception;
    void acceptMatchRequest(User user, Long userMatchId) throws Exception;
    void deleteMatchRequest(User user, Long matchId) throws Exception;
    List<UserMatchDTO> getMatchRequests(User user) throws Exception;
    List<UserMatch> usersAlreadyInUserMatchTable(Long userA, Long userB) throws Exception;
    List<UserMatchDTO> getAcceptedMatches(User user) throws Exception;
}
