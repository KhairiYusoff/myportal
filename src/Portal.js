import React from "react";

const Portal = () => {
  const token = localStorage.getItem("token");
  console.log("Token in Portal:", token);

  return <div>Portal</div>;
};

export default Portal;
