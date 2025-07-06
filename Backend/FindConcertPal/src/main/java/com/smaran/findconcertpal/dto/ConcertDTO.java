package com.smaran.findconcertpal.dto;

import lombok.Data;

@Data
public class ConcertDTO {
    private String concertId;  // Ticketmaster event ID
    private String title;      // Event name
    private String date;       // Local date of the event (e.g. "2025-07-10")
    private String venue;      // Venue name
    private String imageUrl;   // URL of event image
}
