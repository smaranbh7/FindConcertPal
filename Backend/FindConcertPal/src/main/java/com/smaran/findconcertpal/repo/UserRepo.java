package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
