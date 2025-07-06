package com.smaran.findconcertpal.service.implementation;

import com.fasterxml.jackson.databind.JsonNode;
import com.smaran.findconcertpal.dto.ConcertDTO;
import com.smaran.findconcertpal.model.User;
import com.smaran.findconcertpal.service.TicketmasterService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketmasterServiceImpl implements TicketmasterService {

    @Value("${ticketmaster.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<ConcertDTO> getConcertsByUserPreferences(User user) {
        // First try: Just get all music events in the city
        List<ConcertDTO> concerts = searchConcerts(user, false);
        
        if (concerts.isEmpty()) {
            System.out.println("No concerts found with city filter, trying state-wide search...");
            // Second try: Search state-wide
            concerts = searchStateWideConcerts(user);
        }
        
        return concerts;
    }

    private List<ConcertDTO> searchConcerts(User user, boolean includeGenre) {
        String baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
        
        System.out.println("\n=== Starting Concert Search ===");
        System.out.println("User city: " + user.getCity());
        System.out.println("User state: " + user.getState());
        System.out.println("User genres: " + user.getGenres());
        
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("apikey", apiKey)
                .queryParam("city", user.getCity())
                .queryParam("stateCode", user.getState())
                .queryParam("countryCode", "US")
                .queryParam("classificationName", "music")
                .queryParam("sort", "date,asc")
                .queryParam("size", 20);

        if (includeGenre && user.getGenres() != null && !user.getGenres().isEmpty()) {
            String genre = user.getGenres().get(0); // Just use the first genre
            System.out.println("Including genre in search: " + genre);
            uriBuilder.queryParam("keyword", genre);
        }

        String url = uriBuilder.toUriString();
        System.out.println("\nCalling Ticketmaster API: " + url);

        try {
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            System.out.println("Response status: " + response.getStatusCode());

            List<ConcertDTO> concerts = new ArrayList<>();

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = response.getBody();
                
                // Log the entire response for debugging
                System.out.println("\nAPI Response:");
                System.out.println(root.toString());
                
                JsonNode embedded = root.path("_embedded");
                if (!embedded.isMissingNode()) {
                    JsonNode events = embedded.path("events");
                    if (events.isArray()) {
                        System.out.println("\nFound " + events.size() + " events");
                        for (JsonNode event : events) {
                            try {
                                ConcertDTO concert = parseConcert(event);
                                concerts.add(concert);
                                System.out.println("Added concert: " + concert.getTitle() + " at " + concert.getVenue());
                            } catch (Exception e) {
                                System.out.println("Error parsing concert: " + e.getMessage());
                            }
                        }
                    } else {
                        System.out.println("Events field is not an array");
                    }
                } else {
                    System.out.println("No _embedded field found in response");
                }
            }

            System.out.println("\nTotal concerts found: " + concerts.size());
            return concerts;
            
        } catch (Exception e) {
            System.out.println("Error calling Ticketmaster API: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private List<ConcertDTO> searchStateWideConcerts(User user) {
        String baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
        
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("apikey", apiKey)
                .queryParam("stateCode", user.getState())
                .queryParam("countryCode", "US")
                .queryParam("classificationName", "music")
                .queryParam("sort", "date,asc")
                .queryParam("size", 20);

        String url = uriBuilder.toUriString();
        System.out.println("\nTrying state-wide search: " + url);

        try {
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            List<ConcertDTO> concerts = new ArrayList<>();

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode embedded = response.getBody().path("_embedded");
                if (!embedded.isMissingNode()) {
                    JsonNode events = embedded.path("events");
                    if (events.isArray()) {
                        for (JsonNode event : events) {
                            try {
                                concerts.add(parseConcert(event));
                            } catch (Exception e) {
                                System.out.println("Error parsing concert: " + e.getMessage());
                            }
                        }
                    }
                }
            }

            System.out.println("Found " + concerts.size() + " concerts in state-wide search");
            return concerts;
        } catch (Exception e) {
            System.out.println("Error in state-wide search: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    private ConcertDTO parseConcert(JsonNode event) {
        ConcertDTO dto = new ConcertDTO();
        dto.setConcertId(event.path("id").asText());
        dto.setTitle(event.path("name").asText());
        dto.setDate(event.path("dates").path("start").path("localDate").asText(""));
        
        JsonNode venues = event.path("_embedded").path("venues");
        if (!venues.isMissingNode() && venues.isArray() && venues.size() > 0) {
            dto.setVenue(venues.get(0).path("name").asText(""));
        } else {
            dto.setVenue("Venue not specified");
        }

        JsonNode images = event.path("images");
        if (!images.isMissingNode() && images.isArray() && images.size() > 0) {
            dto.setImageUrl(images.get(0).path("url").asText(""));
        } else {
            dto.setImageUrl("");
        }
        
        return dto;
    }
}
