// SystemAdminHeader.js

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SystemAdminHeader = ({
  searchDate,
  setSearchDate,
  searchId,
  setSearchId,
  handleSearchDate,
  handleAddFlight,
  handleSearchId,
}) => {
  const navigate = useNavigate();

  const handleNavigateToUsersList = () => {
    navigate("/usersList");
  };

  const handleInputChange = (event) => {
    setSearchId(event.target.value);
  };

  return (
    <div>
      <h1>System Admin Page</h1>
      <div className="date-picker-container">
        <DatePicker
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
        />
        <Button variant="contained" color="primary" onClick={handleSearchDate}>
          Search
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddFlight}>
          Add Flight
        </Button>
        <Button variant="contained" color="primary" onClick={handleNavigateToUsersList}>
          View Users List
        </Button>
      </div>
      <div className="search-id-container">
        <TextField
          label="Search by ID"
          type="text"
          value={searchId}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={() => handleSearchId(searchId)}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SystemAdminHeader;
