import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("signup"); // "signup" or "signin"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formType === "signup" ? "/signup" : "/login"; // login not yet created
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResponseMsg(data.message || "Success");
      if (formType === "signin") {
        localStorage.setItem("auth", "true");
        onLoginSuccess();  // Store auth status after successful login
        navigate("/dashboard");  // Navigate to the dashboard
        console.log("Navigating to dashboard")
      }
    } catch (err) {
      setResponseMsg(err.message);
    }
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
            onClick={() =>
              setFormType(formType === "signup" ? "signin" : "signup")
            }
          >
            Switch to {formType === "signup" ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
