package com.smaran.findconcertpal.repo;


import com.smaran.findconcertpal.model.UserConcert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserConcertRepo extends JpaRepository<UserConcert, Long> {
    List<UserConcert> findUserConcertByUserId(Long UserId);
}
