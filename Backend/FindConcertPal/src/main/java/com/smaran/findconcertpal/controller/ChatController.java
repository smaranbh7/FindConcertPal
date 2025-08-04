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
        System.out.println("Received message from: " + chatMessage.getSenderId() + " to: " + chatMessage.getReceiverId());
        System.out.println("Message content: " + chatMessage.getContent());
        
        // Save message to database
        ChatMessage savedMessage = chatMessageRepo.save(chatMessage);
        System.out.println("Message saved to database with ID: " + savedMessage.getId());
        
        // Forward message via WebSocket - Use topic-based approach for simplicity
        String chatTopic = "/topic/chat/" + chatMessage.getReceiverId();
        System.out.println("Sending WebSocket message to topic: " + chatTopic);
        System.out.println("WebSocket message payload: " + savedMessage);
        
        messagingTemplate.convertAndSend(chatTopic, savedMessage);
        
        System.out.println("WebSocket message sent successfully to topic");
    }
    
    @GetMapping("/history/{user1}/{user2}")
    public List<ChatMessage> getChatHistory(@PathVariable String user1, @PathVariable String user2) {
        System.out.println("Fetching chat history between users: " + user1 + " and " + user2);
        List<ChatMessage> messages = chatMessageRepo.findConversationBetweenUsers(user1, user2);
        System.out.println("Found " + messages.size() + " messages in chat history");
        return messages;
    }
}