package com.smaran.findconcertpal.dto;


import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private Long id;
    private String fullName;
    private int age;
    private String email;


    private String city;
    private String state;
    private String country;

    private List<String> genres;

    private String profileImageUrl;

    private String bio;

    private String concertId;

}
