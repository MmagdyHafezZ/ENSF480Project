import React, { useState } from "react";

// Import icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";

const Search = () => {
  // State for form data
  const [formData, setFormData] = useState({
    location: "",
    travelers: "",
    checkIn: "",
    checkOut: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const holdColor = () => {
    const btns = document.querySelectorAll(".singleBtn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((btn) => {
          btn.classList.remove("active");
        });
        btn.classList.add("active");
      });
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success
      console.log("Form data submitted:", formData);
      // Reset form or navigate to another page, etc.
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="search container section">
      <form onSubmit={handleSubmit} className="sectionContainer grid">
        <div
          className="sectionContainer grid"
          style={{
            cursor: "pointer",
          }}
        >
          <div className="btns flex">
            <div className="singleBtn" onClick={holdColor()}>
              <span>Economy</span>
            </div>
            <div className="singleBtn">
              <span>Business Class</span>
            </div>
            <div className="singleBtn">
              <span>First Class</span>
            </div>
          </div>

          <div className="searchInputs flex">
            {/* Single Input */}
            <div className="singleInput flex">
              <div className="iconDiv">
                <HiOutlineLocationMarker className="icon" />
              </div>
              <div className="texts">
                <h4>Location</h4>
                <input
                  name="location"
                  type="text"
                  placeholder="Where we dropping boys?"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Single Input */}
            <div className="singleInput flex">
              <div className="iconDiv">
                <RiAccountPinCircleLine className="icon" />
              </div>
              <div className="texts">
                <h4>Travelers</h4>
                <input type="text" placeholder="Add Dudes" />
              </div>
            </div>

            {/* Single Input */}
            <div className="singleInput flex">
              <div className="iconDiv">
                <RxCalendar className="icon" />
              </div>
              <div className="texts">
                <h4>Check In</h4>
                <input type="text" placeholder="Add Date" />
              </div>
            </div>

            {/* Single Input */}
            <div className="singleInput flex">
              <div className="iconDiv">
                <RxCalendar className="icon" />
              </div>
              <div className="texts">
                <h4>Check out</h4>
                <input type="text" placeholder="Add Date" />
              </div>
            </div>
            <button type="submit" className="btn btnBlock flex">
              Search Flight
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Search;
