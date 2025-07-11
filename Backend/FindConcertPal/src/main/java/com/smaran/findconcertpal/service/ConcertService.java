package com.smaran.findconcertpal.service;

import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserConcert;

public interface ConcertService {
    void addConcertToUser(Long userId, String concertId) throws Exception;
}
