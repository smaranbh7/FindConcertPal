package com.smaran.findconcertpal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class UserConcert {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private User user;

    private String concertId;  //External concert ID from Ticketmaster
    private String title;      // Event name
    private String date;       // Local date of the event (e.g. "2025-07-10")
    private String venue;      // Venue name
    private String city;
    private String imageUrl;   // URL of event image

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private LocalDateTime createdAt;

    public enum AttendanceStatus {
        GOING,
        INTERESTED,
        NOTGOING
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
