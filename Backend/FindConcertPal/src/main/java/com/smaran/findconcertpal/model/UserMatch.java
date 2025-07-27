package com.smaran.findconcertpal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Entity
public class UserMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;

    private String concertId; // Concert both users are attending

    private RequestStatus status;

    private LocalDateTime createdAt;

    public enum RequestStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }

}
