package com.smaran.findconcertpal.service.implementation;

import com.smaran.findconcertpal.dto.UserDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserConcert;
import com.smaran.findconcertpal.repo.UserConcertRepo;
import com.smaran.findconcertpal.service.ConcertService;
import com.smaran.findconcertpal.service.MatchUserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchUserServiceImpl implements MatchUserService {

    private final UserConcertRepo userConcertRepo;
    private final ConcertService concertService;

    public MatchUserServiceImpl(UserConcertRepo userConcertRepo, ConcertService concertService){
        this.userConcertRepo=userConcertRepo;
        this.concertService= concertService;
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
