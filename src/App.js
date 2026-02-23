import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      {/* ===== NAVBAR ===== */}
      <nav style={{ padding: "15px", background: "#f4f4f4" }}>
        <Link style={{ marginRight: "15px" }} to="/">Dashboard</Link>
        <Link style={{ marginRight: "15px" }} to="/employees">Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </nav>

      {/* ===== ROUTES ===== */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;