import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!identifier || !password) return setError("All fields required");

    try {
      await axios.post(
        "https://trading-platform-project-backend.onrender.com/login",
        { identifier, password },
        { withCredentials: true }
      );
      window.location.href = "/"; 
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/logo.png" alt="logo"  style={{height:"2rem"}}  className="me-5"/>
          <h1>Trading Platform</h1>
        </div>
        <div className="auth-title">Login to your account</div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="auth-actions">
            <button className="btn-primary" type="submit" style={{backgroundColor:'#ff5722'}}>Login</button>
            <Link to="/signup" >Sign up</Link>
          </div>
        </form>

        <div className="auth-footer">
          By continuing, you agree to our <a href="#">Terms</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;
