import React, { useEffect, useState } from "react";
import { fetchUserDetails, refreshToken } from "./requests";
import Logout from "./Logout";

const Portal = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState("00:00");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserDetails();
        setUserDetails(data);

        // Get the token expiration time from local storage
        const tokenExpirationTime = localStorage.getItem("expires");
        if (tokenExpirationTime) {
          setExpirationTime(new Date(tokenExpirationTime));
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (expirationTime) {
      timer = setInterval(async () => {
        const currentTime = new Date();
        const remainingTimeValue = expirationTime - currentTime;

        if (remainingTimeValue <= 0) {
          try {
            // Refresh the token
            const data = await refreshToken();
            const newExpirationTime = new Date(data.expires);
            localStorage.setItem("expires", data.expires);
            setExpirationTime(newExpirationTime);
          } catch (error) {
            console.error("Failed to refresh token:", error);
            clearInterval(timer);
            setRemainingTime("00:00");
          }
        } else {
          const minutes = Math.floor(remainingTimeValue / 60000);
          const seconds = Math.floor((remainingTimeValue % 60000) / 1000);
          const formattedTime = `${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          setRemainingTime(formattedTime);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [expirationTime]);

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
          <div className="timer">
            <p>Token refresh in: {remainingTime}</p>
          </div>
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
