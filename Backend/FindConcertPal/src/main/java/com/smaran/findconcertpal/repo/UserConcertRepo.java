package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.UserConcert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserConcertRepo extends JpaRepository<UserConcert, Long> {
}
