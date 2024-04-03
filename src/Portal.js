import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "./requests";
import Logout from "./Logout";

const Portal = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserDetails();
        setUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="portal">
      <h1>Welcome to Chativo Portal</h1>
      {userDetails ? (
        <div className="user-details">
          <h2>User Details</h2>
          <p>User ID: {userDetails.user_id}</p>
          <p>Client ID: {userDetails.client_id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <br />
          <Logout />
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Portal;
