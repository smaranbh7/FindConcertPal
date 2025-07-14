package com.smaran.findconcertpal.service.implementation;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.dto.UserMatchDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserConcert;
import com.smaran.findconcertpal.model.UserMatch;
import com.smaran.findconcertpal.repo.UserConcertRepo;
import com.smaran.findconcertpal.repo.UserMatchRepo;
import com.smaran.findconcertpal.service.ConcertService;
import com.smaran.findconcertpal.service.MatchUserService;
import com.smaran.findconcertpal.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MatchUserServiceImpl implements MatchUserService {

    private final UserConcertRepo userConcertRepo;
    private final ConcertService concertService;
    private final UserMatchRepo userMatchRepo;
    private final UserService userService;


    public MatchUserServiceImpl(UserConcertRepo userConcertRepo, ConcertService concertService, UserMatchRepo userMatchRepo, UserService userService){
        this.userConcertRepo=userConcertRepo;
        this.concertService= concertService;
        this.userMatchRepo=userMatchRepo;
        this.userService= userService;
    }

    @Override
    public List<UserDTO> matchingUsers(User user) throws Exception {
        List<UserConcert> usersConcerts = concertService.userMatchingConcerts(user);
        List<UserDTO> potentialMatchingUsers = new ArrayList<>();
        Long currentUserId = user.getId();

        for (UserConcert uc : usersConcerts) {
            String concertId = uc.getConcertId();
            List<UserDTO> usersForConcert = usersGoingSameConcerts(concertId);
            for (UserDTO dto : usersForConcert) {
                if (!dto.getId().equals(currentUserId)) {  // exclude current user
                    potentialMatchingUsers.add(dto);
                }
            }
        }

        return potentialMatchingUsers;
    }

    @Override
    @Transactional
    public void sendMatchRequest(Long senderId, Long receiverId) throws Exception {
        User sender = userService.findUserById(senderId);
        User receiver = userService.findUserById(receiverId);

        UserMatch userMatchRequest = new UserMatch();
        userMatchRequest.setSender(sender);
        userMatchRequest.setReceiver(receiver);
        userMatchRequest.setStatus(UserMatch.RequestStatus.PENDING);
        userMatchRepo.save(userMatchRequest);
    }

    @Override
    @Transactional
    public void acceptMatchRequest(User user, Long userMatchId) throws Exception {
        Optional<UserMatch> userMatchOptional = userMatchRepo.findById(userMatchId);

        if (userMatchOptional.isPresent()) {
            UserMatch userMatch = userMatchOptional.get();
            userMatch.setStatus(UserMatch.RequestStatus.ACCEPTED);
            userMatchRepo.save(userMatch);
        } else {
            throw new Exception("Match request not found");
        }

    }

    @Override
    public List<UserMatchDTO> getMatchRequests(User user) throws Exception {
        List<UserMatch> receivedRequests = userMatchRepo.findUserMatchByReceiver(user);
        if(receivedRequests.isEmpty()){
            return new ArrayList<>();
        }
        List<UserMatchDTO> userDTOS = new ArrayList<>();
        for(UserMatch um : receivedRequests){
            User sender = um.getSender();
            UserMatchDTO userMatchDTO = new UserMatchDTO();
            userMatchDTO.setId(um.getId());
            userMatchDTO.setSenderId(sender.getId());
            userMatchDTO.setFullName(sender.getFullName());
            userMatchDTO.setAge(sender.getAge());
            userMatchDTO.setEmail(sender.getEmail());
            userMatchDTO.setCity(sender.getCity());
            userMatchDTO.setState(sender.getState());
            userMatchDTO.setCountry(sender.getCountry());
            userMatchDTO.setGenres(sender.getGenres());
            userMatchDTO.setProfileImageUrl(sender.getProfileImageUrl());
            userMatchDTO.setBio(sender.getBio());
            userDTOS.add(userMatchDTO);
        }
        return userDTOS;
    }


    //Listing potential matching user logics
    @Override
    public List<UserDTO> usersGoingSameConcerts(String concertId) throws Exception {
        List<UserConcert> userConcerts= userConcertRepo.findUserConcertByConcertId(concertId);
        if(userConcerts.isEmpty()){
            return new ArrayList<>();
        }else{
            List<UserDTO> userDTOs= new ArrayList<>();
            for(UserConcert userConcert: userConcerts){
                User user = userConcert.getUser();
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setFullName(user.getFullName());
                userDTO.setAge(user.getAge());
                userDTO.setEmail(user.getEmail());
                userDTO.setCity(user.getCity());
                userDTO.setState(user.getState());
                userDTO.setCountry(user.getCountry());
                userDTO.setGenres(user.getGenres());
                userDTO.setProfileImageUrl(user.getProfileImageUrl());
                userDTO.setBio(user.getBio());
                userDTOs.add(userDTO);
            }
            return userDTOs;
        }
    }


}
