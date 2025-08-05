package com.smaran.findconcertpal.dto;

import lombok.Data;

@Data
public class MatchRequestDTO {
    private Long receiverId;
    private String concertId;
}
