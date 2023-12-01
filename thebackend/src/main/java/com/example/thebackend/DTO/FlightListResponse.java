package com.example.thebackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FlightListResponse
 */
@Data
@NoArgsConstructor
public class FlightListResponse {

    private String iataorigin;

    private String iatadest;

    private String departing;

    private String returning;

    public FlightListResponse(String iataorigin, String iatadest, String departing, String returning) {
        this.iataorigin = iataorigin;
        this.iatadest = iatadest;
        this.departing = departing;
        this.returning = returning;
    }
}