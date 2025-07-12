package com.smaran.findconcertpal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fullName;
    private int age;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String city;
    private String state;
    private String country;

    private List<String> genres;

    private String profileImageUrl;

    private String bio;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserConcert> userConcerts;

//    @OneToMany(mappedBy = "senderId, receiverId", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<UserMatch> userMatches;

    private boolean isActive;


}
