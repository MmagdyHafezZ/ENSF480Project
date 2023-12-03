// UsersList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from the API endpoint
    axios.get("http://localhost:8080/api/user/getUsers")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {/* Display relevant user information */}
            {`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
