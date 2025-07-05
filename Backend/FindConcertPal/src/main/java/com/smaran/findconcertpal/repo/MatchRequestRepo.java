package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.MatchRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRequestRepo extends JpaRepository<MatchRequest, Long> {
}
