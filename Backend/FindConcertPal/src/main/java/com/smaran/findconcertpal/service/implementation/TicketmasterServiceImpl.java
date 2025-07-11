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
        String url = UriComponentsBuilder.fromUriString("https://app.ticketmaster.com/discovery/v2/events.json")
                .queryParam("apikey", apiKey)
                .queryParam("city", user.getCity())
                .queryParam("classificationName", "music")
                .queryParam("keyword", user.getGenres().get(0))
                .queryParam("sort", "date,asc")
                .queryParam("size", 20)
                .build()
                .toUriString();

        try {
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            List<ConcertDTO> concerts = new ArrayList<>();

            if (response.getBody() != null && response.getBody().has("_embedded")) {
                JsonNode events = response.getBody().path("_embedded").path("events");
                for (JsonNode event : events) {
                    ConcertDTO concert = new ConcertDTO();
                    concert.setConcertId(event.path("id").asText());
                    concert.setTitle(event.path("name").asText());
                    concert.setDate(event.path("dates").path("start").path("localDate").asText());
                    
                    // Get venue if available
                    JsonNode venues = event.path("_embedded").path("venues");
                    if (venues.isArray() && !venues.isEmpty()) {
                        concert.setVenue(venues.get(0).path("name").asText());
                        concert.setCity(getCity(venues.get(0)));
                    }

                    // Get image if available
                    JsonNode images = event.path("images");
                    if (images.isArray() && images.size() > 0) {
                        concert.setImageUrl(images.get(0).path("url").asText());
                    }
                    
                    concerts.add(concert);
                }
            }
            return concerts;
        } catch (Exception e) {
            System.out.println("Error fetching concerts: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    private String getCity(JsonNode venue) {
        if (venue == null) {
            return "Unknown City";
        }

        JsonNode cityNode = venue.path("city");
        if (!cityNode.isMissingNode() && cityNode.has("name")) {
            String city = cityNode.path("name").asText();
            if (!city.isEmpty()) {
                return city;
            }
        }

        // Fallback to address if city is not directly available
        JsonNode addressNode = venue.path("address");
        if (!addressNode.isMissingNode() && addressNode.has("line1")) {
            return addressNode.path("line1").asText();
        }

        return "Unknown City";
    }
}
