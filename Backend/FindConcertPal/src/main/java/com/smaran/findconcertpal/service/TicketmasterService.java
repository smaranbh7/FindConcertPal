package com.smaran.findconcertpal.service;

import com.smaran.findconcertpal.dto.ConcertDTO;
import com.smaran.findconcertpal.model.User;

import java.util.List;

public interface TicketmasterService {
    public List<ConcertDTO> getConcertsByUserPreferences(User user);
}
