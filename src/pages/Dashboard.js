import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [data, setData] = useState({
    total_employees: 0,
    total_attendance: 0,
    total_present: 0,
  });

  useEffect(() => {
    API.get("attendance/dashboard/").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div className="card-container">
        <div className="card blue">
          Total Employees: {data.total_employees}
        </div>

        <div className="card green">
          Total Present: {data.total_present}
        </div>

        <div className="card red">
          Total Attendance: {data.total_attendance}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;