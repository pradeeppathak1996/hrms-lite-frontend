import { useEffect, useState } from "react";
import API from "../api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const fetchAttendance = async () => {
    const res = await API.get("attendance/");
    setAttendance(Array.isArray(res.data) ? res.data : []);
  };

  const fetchEmployees = async () => {
    const res = await API.get("employees/");
    setEmployees(Array.isArray(res.data) ? res.data : []);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance</h2>

      {attendance.length === 0 ? (
        <p>No records</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((att) => (
              <tr key={att.id}>
                <td>{att.employee_name}</td>
                <td>{att.date}</td>
                <td>{att.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attendance;