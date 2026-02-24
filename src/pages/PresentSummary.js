import { useEffect, useState } from "react";
import API from "../api";

function PresentSummary() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/attendance/dashboard/")
      .then((res) => {
        setSummary(res.data);
      })
      .catch(() => {
        setError("Failed to load summary");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Present Summary</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {summary && (
        <>
          <p>Total Records: {summary.total_records}</p>
          <p>Present: {summary.present}</p>
          <p>Absent: {summary.absent}</p>
        </>
      )}
    </div>
  );
}

export default PresentSummary;