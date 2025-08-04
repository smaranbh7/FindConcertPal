package com.smaran.findconcertpal.repo;

import com.smaran.findconcertpal.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepo extends JpaRepository<ChatMessage, Long> {
    
    @Query("SELECT c FROM ChatMessage c WHERE " +
           "(c.senderId = :userId1 AND c.receiverId = :userId2) OR " +
           "(c.senderId = :userId2 AND c.receiverId = :userId1) " +
           "ORDER BY c.timestamp ASC")
    List<ChatMessage> findConversationBetweenUsers(@Param("userId1") String userId1, 
                                                   @Param("userId2") String userId2);
}