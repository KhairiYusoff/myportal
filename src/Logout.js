import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Clear authentication data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expires");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  return (
    <div>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
