import React from "react";
import "./index.css";
const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };
  return (
    <div>
      <button className="logoutButton" onClick={handleLogout}>
        {" "}
        Çıkış Yap
      </button>
    </div>
  );
};

export default Logout;
