import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
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
