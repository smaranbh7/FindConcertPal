package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserMatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMatchRepo extends JpaRepository<UserMatch, Long> {
    List<UserMatch> findUserMatchByReceiver(User user);
    UserMatch findUserMatchById(Long userMatchId);
}
