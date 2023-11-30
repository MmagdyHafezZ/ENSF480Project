package com.example.thebackend.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "userpreferences")
public class UserPreferences {

    @Id
    private Long id;

    private String mealPreference;
    private String seatPreference;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserProfile userProfile;

    // Constructors, Getters and Setters
    public UserPreferences(String mealPreference, String seatPreference) {
        this.mealPreference = mealPreference;
        this.seatPreference = seatPreference;
    }

    public UserPreferences() {
    }

    public String getMealPreference() {
        return mealPreference;
    }
    public String getSeatPreference() {
        return seatPreference;
    }
    public UserProfile getUserProfile() {
        return userProfile;
    }
    public void setMealPreference(String mealPreference) {
        this.mealPreference = mealPreference;
    }
    public void setSeatPreference(String seatPreference) {
        this.seatPreference = seatPreference;
    }
    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public void setId(Long id2) {
        this.id = id2;
    }

}
