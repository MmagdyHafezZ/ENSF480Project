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

    private String iataorigin;

    private String iatadest;

    private String departdate;

    private String returndate;

    private String departtime;

    private String returntime;


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

    public void setIataorigin(String iataorigin){
        this.iataorigin = iataorigin;
    }

    public String getIataorigin(){
        return iataorigin;
    }

    public String getIataDest(){
        return iatadest;
    }

    public void setIataDest(String iatadest){
        this.iatadest = iatadest;
    }

    public String getDepartdate(){
        return departdate;
    }

    public void setDepartdate(String departdate){
        this.departdate = departdate;
    }

    public String getReturndate(){
        return returndate;
    }

    public void setReturndate(String returndate){
        this.returndate = returndate;
    }

    public String getDeparttime(){
        return departtime;
    }

    public void setDeparttime(String departtime){
        this.departtime = departtime;
    }

    public String getReturntime(){
        return returntime;
    }

    public void setReturntime(String returntime){
        this.returntime = returntime;
    }

}