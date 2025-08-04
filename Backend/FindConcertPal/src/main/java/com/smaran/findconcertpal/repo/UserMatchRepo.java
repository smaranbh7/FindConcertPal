package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.model.UserMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserMatchRepo extends JpaRepository<UserMatch, Long> {
    List<UserMatch> findByReceiverAndStatus(User user, UserMatch.RequestStatus status);
    List<UserMatch> findByStatus(UserMatch.RequestStatus status);
    UserMatch findUserMatchById(Long userMatchId);
    @Query("SELECT um FROM UserMatch um " +
            "WHERE ((um.sender.id = :userAId AND um.receiver.id = :userBId) " +
            "   OR (um.sender.id = :userBId AND um.receiver.id = :userAId)) " +
            "AND um.status IN :statuses")
    List<UserMatch> findStatusBetweenUsers(
            @Param("userAId") Long userAId,
            @Param("userBId") Long userBId,
            @Param("statuses") List<UserMatch.RequestStatus> statuses
    );

}
