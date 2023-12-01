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
}