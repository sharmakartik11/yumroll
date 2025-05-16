import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [formType, setFormType] = useState("signup"); // "signup" or "signin"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_BASE_URL = "yumroll-api.vercel.app/api"; // Replace with actual backend Vercel URL
    const endpoint = formType === "signup" ? `signup` : `login`;
    console.log("Endpoint:", endpoint);
    try {
      const res = await fetch(`https://yumroll-api.vercel.app/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResponseMsg(data.message || "Success");

      if (formType === "signin") {
        // Save authentication status and navigate to dashboard
        localStorage.setItem("auth", "true");
        onLoginSuccess(); // Notify parent component about successful login
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      setResponseMsg(err.message);
    }
  };

  const handleSwitchFormType = () => {
    setFormType(formType === "signup" ? "signin" : "signup");
    setUsername(""); // Clear username field
    setPassword(""); // Clear password field
    setResponseMsg(""); // Clear any response message
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">
          {formType === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="login-label">Username:</label>
          <input
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="login-label">Password:</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            {formType === "signup" ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="login-message"
          style={{ color: responseMsg.includes("Success") ? "green" : "red" }}
        >
          {responseMsg}
        </p>

        <p className="login-switch-text">
          {formType === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            className="login-link-button"
            onClick={handleSwitchFormType} // Call the new handler
          >
            Switch to {formType === "signup" ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;