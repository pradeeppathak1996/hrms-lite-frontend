// import { useEffect, useState } from "react";
// import API from "../api";

// function PresentSummary() {
//   const [data, setData] = useState([]);

  // useEffect(() => {
  //   API.get("attendance/present-summary/")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch(() => {
  //       alert("Error fetching summary");
  //     });
  // }, []);

//     useEffect(() => {
//       API.get("/attendance/dashboard/")
//         .then(res => {
//           setSummary(res.data);
//         })
//         .catch(() => {
//           setError("Failed to load summary");
//         });
//     }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Total Present Days Per Employee</h2>

//       {data.length === 0 ? (
//         <p>No data found.</p>
//       ) : (
//         <table className="attendance-table">
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Total Present Days</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((emp) => (
//               <tr key={emp.id}>
//                 {/* ✅ Correct field name */}
//                 <td>{emp.full_name}</td>
//                 <td>{emp.total_present}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default PresentSummary;



// src/pages/PresentSummary.js

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

      {/* 🔽 YE WAHI PART HAI JISKI BAAT HO RAHI THI */}
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