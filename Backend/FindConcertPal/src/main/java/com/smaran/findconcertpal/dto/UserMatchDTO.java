package com.smaran.findconcertpal.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserMatchDTO {
    private Long id;
    private Long senderId;
    private String fullName;
    private int age;
    private String email;


    private String city;
    private String state;
    private String country;

    private List<String> genres;

    private String profileImageUrl;

    private String bio;
    
    private String concertId; // Shared concert ID
}
