package com.smaran.findconcertpal.controller;

import com.smaran.findconcertpal.model.ChatMessage;
import com.smaran.findconcertpal.repo.ChatMessageRepo;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageRepo chatMessageRepo;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatMessageRepo chatMessageRepo){
        this.messagingTemplate= messagingTemplate;
        this.chatMessageRepo = chatMessageRepo;
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage){
        ChatMessage savedMessage = chatMessageRepo.save(chatMessage);
        // Forward message via WebSocket - Use topic-based approach for simplicity
        String chatTopic = "/topic/chat/" + chatMessage.getReceiverId();
        messagingTemplate.convertAndSend(chatTopic, savedMessage);
    }
    
    @GetMapping("/history/{user1}/{user2}")
    public List<ChatMessage> getChatHistory(@PathVariable String user1, @PathVariable String user2) {
        List<ChatMessage> messages = chatMessageRepo.findConversationBetweenUsers(user1, user2);
        return messages;
    }
}