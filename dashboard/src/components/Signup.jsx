import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) return setError("All fields required");

    try {
      await axios.post(
        "https://trading-platform-project-backend.onrender.com/signup",
        { username, email, password },
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
          <img src="/logo.png" alt="logo" style={{height:"2rem"}}  className="me-5"/>
          <h1>Trading Platform</h1>
        </div>
        <div className="auth-title">Create your account</div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="auth-actions">
            <button className="btn-primary" style={{backgroundColor:'#ff5722' }} type="submit">Sign up</button>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </form>

        <div className="auth-footer">
          By creating an account you agree to our <a href="#">Terms</a>.
        </div>
      </div>
    </div>
  );
};

export default Signup;
