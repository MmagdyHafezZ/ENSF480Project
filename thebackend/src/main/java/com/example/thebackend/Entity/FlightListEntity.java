package com.example.thebackend.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * FlightListEntity
 */
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "flightlist")
public class FlightListEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "searchbookingid", referencedColumnName = "id")
    private SearchBookingEntity searchbookingid;

    @Column(name = "iataorigin")
    private String iataorigin;

    @Column(name = "iatadest")
    private String iatadest;

    @Column(name = "departdate")
    private String departdate;

    @Column(name = "returndate")
    private String returndate;

    @Column(name = "departtime")
    private String departtime;

    @Column(name = "returntime")
    private String returntime;

    @Column(name = "model")
    private String model;

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setSearchbookingid(SearchBookingEntity searchbookingid){
        this.searchbookingid = searchbookingid;
    }

    public SearchBookingEntity getSearchbookingid(){
        return searchbookingid;
    }

    public void setIataorigin(String iataorigin){
        this.iataorigin = iataorigin;
    }

    public String getIataorigin(){
        return iataorigin;
    }

    public String getIatadest(){
        return iatadest;
    }

    public void setIatadest(String iatadest){
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

    public String getModel(){
        return model;
    }

    public void setModel(String model){
        this.model = model;
    }
}