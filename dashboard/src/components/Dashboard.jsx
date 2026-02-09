import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const resp = await axios.get(`${API_BASE_URL}/me`, {
          withCredentials: true,
        });

        if (!cancelled && !resp.data.user) {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        if (!cancelled) {
          navigate("/login", { replace: true });
        }
      }
    };

    const timer = setTimeout(check, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      <div className="content">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
