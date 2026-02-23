import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

function AttendanceDetails() {
  const { employeeId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await API.get(`attendance/${employeeId}/`);
        setData(res.data);
      } catch (error) {
        alert("Error fetching attendance details");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) {
    return <h3 style={{ padding: "20px" }}>Loading...</h3>;
  }

  if (!data) {
    return <h3 style={{ padding: "20px" }}>No Data Found</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/attendance">⬅ Back</Link>

      <h2>Attendance Details</h2>
      <h3 style={{ color: "#007bff" }}>{data.employee_name}</h3>

      {/* Summary Box */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f4f6f9",
          borderRadius: "8px"
        }}
      >
        <p><strong>Total Days:</strong> {data.total_days}</p>

        <p style={{ color: "green", fontWeight: "bold" }}>
          Present: {data.present}
        </p>

        <p style={{ color: "red", fontWeight: "bold" }}>
          Absent: {data.absent}
        </p>

        <p style={{ fontSize: "18px" }}>
          <strong>Attendance %: {data.attendance_percentage}%</strong>
        </p>
      </div>

      {/* Table */}
      {data.records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.records.map((att) => (
              <tr key={att.id}>
                <td>{att.date}</td>
                <td
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    backgroundColor:
                      att.status === "Present" ? "#d4edda" : "#f8d7da",
                    color:
                      att.status === "Present" ? "green" : "red",
                    fontWeight: "bold",
                    textAlign: "center"
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

export default AttendanceDetails;