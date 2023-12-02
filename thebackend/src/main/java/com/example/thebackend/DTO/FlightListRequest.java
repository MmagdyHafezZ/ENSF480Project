package com.example.thebackend.DTO;

import com.example.thebackend.Entity.FlightListEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FlightListRequest
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightListRequest {

    private FlightListEntity flightListEntity;
}