import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [employeesCount, setEmployeesCount] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      // Employees count
      const empRes = await API.get("/employees/");
      setEmployeesCount(empRes.data.length);

      // Attendance summary
      const summaryRes = await API.get("/attendance/dashboard/");
      setSummary(summaryRes.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>HRMS Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card blue">
          <h3>Total Employees:</h3>
          <p>{employeesCount}</p>
        </div>

        <div className="card purple">
          <h3>Total Present:</h3>
          <p>{summary ? summary.present : 0}</p>
        </div>

        <div className="card green">
          <h3>Total Attendance:</h3>
          <p>{summary ? summary.total_records : 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;