import React from "react";
import Dice from "../Dice/Dice";

const Dashboard = ({ onLogout }) => {
  return (
    <div style={{ padding: 30 }}>
      <h1>Welcome to the Dashboard!</h1>
      <Dice />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;