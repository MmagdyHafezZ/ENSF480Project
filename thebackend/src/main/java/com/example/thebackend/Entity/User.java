package com.example.thebackend.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "first_name")
    private String first_name;
    @Column(name = "last_name")
    private String last_name;    
    @Column(name = "membershipType")
    private Memberships membershipType;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private UserProfile userProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserCreditCard creditCard;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UserPreferences> preferences;
    
    @OneToMany(mappedBy = "userid", cascade = CascadeType.ALL)
    @JsonManagedReference // Allows serialization of PromoEntity list in User
    private List<PromoEntity> promos;


    // No-argument constructor
    public User() {
    }

    // All-argument constructor
    public User(Long id, String email, String password, String first_name, String last_name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public void setfirst_name(String first_name) { this.first_name = first_name; }
    public String getfirst_name() { return first_name; }
    public void setlast_name(String last_name) { this.last_name = last_name; }
    public String getlast_name() { return last_name; }

    public void setmembershipType(Memberships membershipType) {
        this.membershipType = membershipType;
    }
    public Memberships getmembershipType() {
        return membershipType;
    }

    public void setUserProfile(UserProfile userProfile2) {
        this.userProfile = userProfile2;
    }

    public List<PromoEntity> getPromos() {
        return promos;
    }

    public void setPromos(List<PromoEntity> promos) {
        this.promos = promos;
    }
}
