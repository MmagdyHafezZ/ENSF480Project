// src/utils/userProfileHelper.js
import axios from "axios";

export const fetchAndStoreUserProfile = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/user/profile/${userId}`
    );
    const userProfile = response.data;

    // Store the user profile in localStorage
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

/**
 * The way to use this function is as follows:
 * import { fetchAndStoreUserProfile } from "./utils/userProfileHelper";
 * fetchAndStoreUserProfile(userId);
 * This will fetch the user profile and store it in localStorage.
 * The function will also return the user profile:
 * // In any component
 * const userProfile = JSON.parse(localStorage.getItem('userProfile'));
 * if (userProfile) {
  console.log("User's membership type:", userProfile.membershipType);
  // ... use userProfile data as needed
}
 */
