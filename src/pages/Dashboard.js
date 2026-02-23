import { useEffect, useState } from "react";
import API from "../api"; // path agar alag ho to adjust karna

function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    attendance: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const empRes = await API.get("employees/");
      const attRes = await API.get("attendance/");

      const employees = empRes.data || [];
      const attendance = attRes.data || [];

      const presentCount = attendance.filter(
        (a) => a.status === "Present"
      ).length;

      setStats({
        employees: employees.length,
        present: presentCount,
        attendance: attendance.length,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ marginBottom: 25 }}>Dashboard</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Card title="Total Employees" value={stats.employees} color="#007bff" />
        <Card title="Total Present" value={stats.present} color="#28a745" />
        <Card title="Total Attendance" value={stats.attendance} color="#6f42c1" />
      </div>
    </div>
  );
}

const Card = ({ title, value, color }) => (
  <div
    style={{
      minWidth: 220,
      padding: 20,
      borderRadius: 12,
      background: color,
      color: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    }}
  >
    <h3>{title}</h3>
    <h1>{value}</h1>
  </div>
);

export default Dashboard;