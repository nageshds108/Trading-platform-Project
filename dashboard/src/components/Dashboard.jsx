import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://YOUR-BACKEND.onrender.com";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/me`,
          { withCredentials: true }
        );

        if (!cancelled && !res.data.user) {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        if (!cancelled) {
          navigate("/login", { replace: true });
        }
      }
    };

    const timer = setTimeout(checkAuth, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* rest of your dashboard UI */}
    </div>
  );
};

export default Dashboard;
