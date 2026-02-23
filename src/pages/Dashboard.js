import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const empRes = await API.get("employees/");
      const attRes = await API.get("attendance/");

      const employees = Array.isArray(empRes.data) ? empRes.data : [];
      const attendance = Array.isArray(attRes.data) ? attRes.data : [];

      setTotalEmployees(employees.length);
      setTotalAttendance(attendance.length);

      const presentCount = attendance.filter(
        (a) => a.status === "Present"
      ).length;

      setTotalPresent(presentCount);
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "25px" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Total Employees */}
        <div
          style={{
            background: "linear-gradient(135deg, #007bff, #00c6ff)",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Employees</h3>
          <h1>{totalEmployees}</h1>
        </div>

        {/* Total Present */}
        <div
          style={{
            background: "linear-gradient(135deg, #28a745, #7dff9c)",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Present</h3>
          <h1>{totalPresent}</h1>
        </div>

        {/* Total Attendance */}
        <div
          style={{
            background: "linear-gradient(135deg, #6f42c1, #b28cff)",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>Total Attendance</h3>
          <h1>{totalAttendance}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;