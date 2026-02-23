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
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>Total Employees: {totalEmployees}</p>
      <p>Total Present: {totalPresent}</p>
      <p>Total Attendance: {totalAttendance}</p>
    </div>
  );
}

export default Dashboard;