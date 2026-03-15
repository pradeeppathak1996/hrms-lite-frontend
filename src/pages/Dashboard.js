import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await API.get("/attendance/dashboard/");
      setSummary(res.data);

      setError(null);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>HRMS Dashboard</h2>

      {loading ? (
        <p className="loading">Loading dashboard...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="dashboard-cards">
          <div className="card blue">
            <h3>Total Employees</h3>
            <p>{summary?.total_employees || 0}</p>
          </div>

          <div className="card purple">
            <h3>Total Present</h3>
            <p>{summary?.present || 0}</p>
          </div>

          <div className="card green">
            <h3>Total Attendance</h3>
            <p>{summary?.total_records || 0}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;