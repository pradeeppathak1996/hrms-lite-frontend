  import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [summary, setSummary] = useState({
    total_employees: 0,
    total_present: 0,
    total_attendance: 0,
  });

  const fetchSummary = async () => {
    try {
      const res = await API.get("dashboard/");
      setSummary(res.data);
    } catch (err) {
      console.error("Dashboard API error", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {/* TOTAL EMPLOYEES */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Employees</h3>
          <h1>{summary.total_employees}</h1>
        </div>

        {/* TOTAL PRESENT */}
        <div
          style={{
            background: "linear-gradient(135deg, #43cea2, #185a9d)",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Present</h3>
          <h1>{summary.total_present}</h1>
        </div>

        {/* TOTAL ATTENDANCE */}
        <div
          style={{
            background: "linear-gradient(135deg, #f7971e, #ffd200)",
            color: "#222",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Attendance</h3>
          <h1>{summary.total_attendance}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;