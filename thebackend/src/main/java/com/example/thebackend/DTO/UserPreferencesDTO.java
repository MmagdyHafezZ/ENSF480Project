package com.example.thebackend.DTO;

import com.example.thebackend.Entity.UserProfile;

public class UserPreferencesDTO {

  private Long id;
  private String mealPreference;
  private String seatPreference; // "aisle" or "window"
  private UserProfile userProfile;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getMealPreference() {
    return mealPreference;
  }

  public void setMealPreference(String mealPreference) {
    this.mealPreference = mealPreference;
  }

  public String getSeatPreference() {
    return seatPreference;
  }

  public void setSeatPreference(String seatPreference) {
    this.seatPreference = seatPreference;
  }

  public UserProfile getUserProfile() {
    return userProfile;
  }
}
