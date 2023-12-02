package com.example.thebackend.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "userPreferences")
public class UserPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mealPreference;
    private String seatPreference;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    // Constructors, Getters and Setters
    public UserPreferences(String mealPreference, String seatPreference, User user) {
        this.mealPreference = mealPreference;
        this.seatPreference = seatPreference;
        this.user = user;
    }
    public UserPreferences() {
    }

    public String getMealPreference() {
        return mealPreference;
    }
    public String getSeatPreference() {
        return seatPreference;
    }
    public void setMealPreference(String mealPreference) {
        this.mealPreference = mealPreference;
    }
    public void setSeatPreference(String seatPreference) {
        this.seatPreference = seatPreference;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public void setId(Long id2) {
        this.id = id2;
    }

}
