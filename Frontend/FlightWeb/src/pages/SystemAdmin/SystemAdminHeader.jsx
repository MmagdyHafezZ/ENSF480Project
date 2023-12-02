import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
const SystemAdminHeader = ({
  searchDate,
  setSearchDate,
  handleSearchDate,
  handleAddFlight,
}) => {
  return (
    <div>
      <h1>System Admin Page</h1>
      <div
        style={{
          display: "block",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
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
      </div>
    </div>
  );
};
  
export default SystemAdminHeader;