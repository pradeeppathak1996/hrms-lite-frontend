import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    employee: "",
    date: today,
    status: "Present",
  });

  // 🔹 Fetch employees & attendance
  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("Error loading employees");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await API.get("attendance/");
      setAttendance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("Error loading attendance");
    }
  };

  // 🔹 Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee) {
      alert("Please select employee");
      return;
    }

    try {
      await API.post("attendance/", form);
      fetchAttendance();
      setForm({ employee: "", date: today, status: "Present" });
    } catch (err) {
      alert("Error marking attendance");
    }
  };

  // 🔹 Filter by date
  const handleFilter = async () => {
    if (!filterDate) {
      fetchAttendance();
      return;
    }

    try {
      const res = await API.get(`attendance/?date=${filterDate}`);
      setAttendance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Error filtering attendance");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mark Attendance</h2>

      {/* ✅ FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <select
          value={form.employee}
          onChange={(e) =>
            setForm({ ...form, employee: Number(e.target.value) })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          min={today}
          max={today}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <h2>Attendance Records</h2>

      {/* ✅ FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter} style={{ marginLeft: "10px" }}>
          Filter
        </button>
        <button onClick={fetchAttendance} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

      {/* ✅ TABLE */}
      {attendance.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table border="1" cellPadding="8">
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
                <td>
                  <Link to={`/attendance/${att.employee}`}>
                    {att.employee_name || "Employee"}
                  </Link>
                </td>
                <td>{att.date}</td>
                <td
                  style={{
                    color: att.status === "Present" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {att.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attendance;