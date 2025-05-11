import React from "react";

const Dashboard = ({ onLogout }) => {
  return (
    <div style={{ padding: 30 }}>
      <h1>Welcome to the Dashboard!</h1>
      <p>You are logged in.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;