package com.smaran.findconcertpal.service.implementation;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.dto.UserMatchDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserConcert;
import com.smaran.findconcertpal.model.UserMatch;
import com.smaran.findconcertpal.repo.UserConcertRepo;
import com.smaran.findconcertpal.repo.UserMatchRepo;
import com.smaran.findconcertpal.service.ConcertService;
import com.smaran.findconcertpal.service.UserMatchService;
import com.smaran.findconcertpal.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserMatchServiceImpl implements UserMatchService {

    private final UserConcertRepo userConcertRepo;
    private final ConcertService concertService;
    private final UserMatchRepo userMatchRepo;
    private final UserService userService;


    public UserMatchServiceImpl(UserConcertRepo userConcertRepo, ConcertService concertService, UserMatchRepo userMatchRepo, UserService userService){
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
                if (!dto.getId().equals(currentUserId) && usersAlreadyInUserMatchTable(currentUserId, dto.getId()).isEmpty()) {  // exclude current user
                    potentialMatchingUsers.add(dto);
                }
            }
        }

        return potentialMatchingUsers;
    }

    @Override
    @Transactional
    public void sendMatchRequest(Long senderId, Long receiverId, String concertId) throws Exception {
        User sender = userService.findUserById(senderId);
        User receiver = userService.findUserById(receiverId);

        UserMatch userMatchRequest = new UserMatch();
        userMatchRequest.setSender(sender);
        userMatchRequest.setReceiver(receiver);
        userMatchRequest.setConcertId(concertId);
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
    public void deleteMatchRequest(User user, Long matchId) throws Exception {
        UserMatch userMatch = userMatchRepo.findUserMatchById(matchId);
        if (!userMatch.getSender().getId().equals(user.getId()) &&
                !userMatch.getReceiver().getId().equals(user.getId())) {
            throw new Exception("You are not authorized to delete this match request");
        }

        userMatchRepo.delete(userMatch);

    }

    @Override
    public List<UserMatchDTO> getMatchRequests(User user) throws Exception {
        List<UserMatch> receivedRequests = userMatchRepo.findByReceiverAndStatus(user, UserMatch.RequestStatus.PENDING);
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

//For not showing the users, who are already in the process of connection, in the matching Users list
    @Override
    public List<UserMatch> usersAlreadyInUserMatchTable(Long userA, Long userB ) throws Exception {
        List<UserMatch> users = userMatchRepo.findStatusBetweenUsers(userA, userB, List.of(UserMatch.RequestStatus.PENDING, UserMatch.RequestStatus.ACCEPTED));
        return users;
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
                userDTO.setConcertId(concertId);
                userDTOs.add(userDTO);
            }
            return userDTOs;
        }
    }

    @Override
    public List<UserMatchDTO> getAcceptedMatches(User user) throws Exception {
        // Get all accepted matches where the user is either sender or receiver
        List<UserMatch> acceptedMatches = userMatchRepo.findByStatus(UserMatch.RequestStatus.ACCEPTED);
        List<UserMatchDTO> chatPartners = new ArrayList<>();
        
        for (UserMatch match : acceptedMatches) {
            User chatPartner = null;
            
            // Determine who the chat partner is (the other person in the match)
            if (match.getSender().getId().equals(user.getId())) {
                chatPartner = match.getReceiver();
            } else if (match.getReceiver().getId().equals(user.getId())) {
                chatPartner = match.getSender();
            }
            
            // If this match involves the current user, add the other person as a chat partner
            if (chatPartner != null) {
                UserMatchDTO chatPartnerDTO = new UserMatchDTO();
                chatPartnerDTO.setId(chatPartner.getId());
                chatPartnerDTO.setFullName(chatPartner.getFullName());
                chatPartnerDTO.setAge(chatPartner.getAge());
                chatPartnerDTO.setEmail(chatPartner.getEmail());
                chatPartnerDTO.setCity(chatPartner.getCity());
                chatPartnerDTO.setState(chatPartner.getState());
                chatPartnerDTO.setCountry(chatPartner.getCountry());
                chatPartnerDTO.setGenres(chatPartner.getGenres());
                chatPartnerDTO.setProfileImageUrl(chatPartner.getProfileImageUrl());
                chatPartnerDTO.setBio(chatPartner.getBio());
                chatPartnerDTO.setConcertId(match.getConcertId()); // Include shared concert
                chatPartners.add(chatPartnerDTO);
            }
        }
        
        return chatPartners;
    }

}
