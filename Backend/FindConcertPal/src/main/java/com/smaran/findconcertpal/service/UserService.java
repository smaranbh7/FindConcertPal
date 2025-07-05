package com.smaran.findconcertpal.service;

import com.smaran.findconcertpal.model.User;

public interface UserService {

    User findUserByEmail(String email) throws Exception;

    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserById(Long userId) throws Exception;
}
