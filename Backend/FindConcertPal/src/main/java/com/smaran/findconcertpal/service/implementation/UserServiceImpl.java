package com.smaran.findconcertpal.service.implementation;

import com.smaran.findconcertpal.config.JwtProvider;
import com.smaran.findconcertpal.dto.ProfileDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.repo.UserRepo;
import com.smaran.findconcertpal.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

     final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepo.findByEmail(email);
        if(user == null){
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> optionalUser = userRepo.findById(userId);
        if(optionalUser.isEmpty()){
            throw new Exception("User not found");
        }
        return optionalUser.get();
    }

    @Override
    public User updateUserDetails(Long userId, ProfileDTO userDetails) throws Exception {
        User user = findUserById(userId);
        user.setFullName(userDetails.getFullName());
        user.setAge(userDetails.getAge());
        user.setCity(userDetails.getCity());
        user.setState(userDetails.getState());
        user.setCountry(userDetails.getCountry());
        user.setGenres(userDetails.getGenres());

        User savedUser= userRepo.save(user);
        return savedUser;
    }
}
