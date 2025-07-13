package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.UserMatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMatchRepo extends JpaRepository<UserMatch, Long> {
}
