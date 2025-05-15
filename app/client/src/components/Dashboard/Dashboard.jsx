import React from "react";
import Dice from "../Dice/Dice";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Welcome to the Dashboard!</h1>
        <Dice />
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    );
  };

export default Dashboard;