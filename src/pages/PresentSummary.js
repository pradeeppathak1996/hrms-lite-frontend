import { useEffect, useState } from "react";
import API from "../api";

function PresentSummary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("attendance/present-summary/")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        alert("Error fetching summary");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Total Present Days Per Employee</h2>

      {data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Total Present Days</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp.id}>
                {/* ✅ Correct field name */}
                <td>{emp.full_name}</td>
                <td>{emp.total_present}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PresentSummary;