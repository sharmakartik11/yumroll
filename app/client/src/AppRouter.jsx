import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on initial load
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(auth === "true"); // Only true if auth is "true"
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Home route: If authenticated, redirect to dashboard, else show login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" /> // Redirect to dashboard if authenticated
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        {/* Dashboard route: Only accessible if authenticated */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" /> // Redirect to login if not authenticated
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
