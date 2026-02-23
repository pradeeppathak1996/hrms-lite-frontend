import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterDate, setFilterDate] = useState("");


  const today = new Date().toLocaleDateString("en-CA"); 

  const [form, setForm] = useState({
    employee: "",
    date: today,       
    status: "Present",
  });

  useEffect(() => {
    fetchAttendance();
    API.get("employees/").then((res) => setEmployees(res.data));
  }, []);

  const fetchAttendance = async () => {
    const res = await API.get("attendance/");
    setAttendance(res.data);
  };


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
      alert(
        err.response?.data?.non_field_errors?.[0] ||
        "Error marking attendance"
      );
    }
  };

  const handleFilter = async () => {
    if (!filterDate) {
      fetchAttendance();
      return;
    }

    const res = await API.get(`attendance/?date=${filterDate}`);
    setAttendance(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mark Attendance</h2>

      {/* ✅ Attendance Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <select
          value={form.employee}
          onChange={(e) =>
            setForm({ ...form, employee: parseInt(e.target.value) })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        {/* ✅ DATE – ONLY TODAY ALLOWED */}
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

      {/* ✅ Date Filter Section */}
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

      {/* ✅ Attendance Table */}
      {attendance.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table className="attendance-table">
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
                  <Link
                    to={`/attendance/${att.employee}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "#007bff",
                    }}
                  >
                    {att.employee_name}
                  </Link>
                </td>
                <td>{att.date}</td>
                <td>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "6px",
                      backgroundColor:
                        att.status === "Present" ? "#d4edda" : "#f8d7da",
                      color:
                        att.status === "Present" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {att.status}
                  </span>
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