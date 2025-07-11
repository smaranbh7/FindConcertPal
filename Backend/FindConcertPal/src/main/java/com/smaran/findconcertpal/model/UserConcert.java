package com.smaran.findconcertpal.model;

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
    private User user;

    private String concertId;  //External concert ID from Ticketmaster
    private String title;      // Event name
    private String date;       // Local date of the event (e.g. "2025-07-10")
    private String venue;      // Venue name
    private String imageUrl;   // URL of event image

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private LocalDateTime createdAt;

    public enum AttendanceStatus {
        GOING,
        NOTGOINGANYMORE
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
