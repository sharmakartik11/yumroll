import React from "react";
import Dice from "../Dice/Dice";
import SwipeGame from "../SwipeGame/SwipeGame";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome to the Dashboard!</h1>
      <div className="dashboard-content">
        <div className="dashboard-left">
          <Dice />
        </div>
        <div className="dashboard-right">
          <SwipeGame />
        </div>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;