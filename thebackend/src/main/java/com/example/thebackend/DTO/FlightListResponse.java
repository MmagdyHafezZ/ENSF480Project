package com.example.thebackend.DTO;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * FlightListResponse
 */
@AllArgsConstructor
@NoArgsConstructor
public class FlightListResponse {

    private Long id;

    private Long searchbookingid;

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setSearchbookingid(Long searchbookingid){
        this.searchbookingid = searchbookingid;
    }

    public Long getSearchbookingid(){
        return searchbookingid;
    }

}