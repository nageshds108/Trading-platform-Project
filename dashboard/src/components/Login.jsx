import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";
import "./Auth.css";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!identifier || !password) return setError("All fields required");

    setLoading(true);
    try {
      const resp = await axios.post(
        `${API_BASE_URL}/login`,
        { identifier, password },
        { withCredentials: true }
      );
      if (resp.status === 200) {
        navigate("/", { replace: true });

      } else {
        setError(resp.data?.message || `Login failed (${resp.status})`);
      }
    } catch (err) {
      const serverMsg = err.response?.data || err.response?.statusText;
      const msg = serverMsg?.message || serverMsg || err.message;
      setError(msg);
    } finally {
      setLoading(false);
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
            <button className="btn-primary" type="submit"  disabled={loading} style={{backgroundColor:'#ff5722'}}>
              {loading ? "Submitting..." : "Login"}
            </button>
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
