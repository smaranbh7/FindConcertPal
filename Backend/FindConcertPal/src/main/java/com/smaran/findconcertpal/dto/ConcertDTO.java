package com.smaran.findconcertpal.dto;

import lombok.Data;

@Data
public class ConcertDTO {
    private String concertId;  // Ticketmaster event ID
    private String title;
    private String date;
    private String venue;
    private String city;
    private String imageUrl;
}
