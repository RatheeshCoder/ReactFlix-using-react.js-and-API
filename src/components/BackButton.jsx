import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <button
      onClick={() => navigate(-1)}
      className={`cursor-pointer duration-200 hover:scale-125 active:scale-100 ${isHome ? "opacity-50" : ""}`}
      title="Go Back"
      disabled={isHome}
      style={{
        position: "fixed",
        top: "20px",  // Adjust the distance from the top
        left: "20px", // Adjust the distance from the left
        zIndex: 1000, // Set a high z-index to make sure it appears above other elements
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300">
        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
      </svg>
    </button>
  );
}

export default BackButton;
