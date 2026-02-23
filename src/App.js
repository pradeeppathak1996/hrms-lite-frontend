import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import AttendanceDetails from "./pages/AttendanceDetails";
import PresentSummary from "./pages/PresentSummary";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/present-summary">Present Summary</Link>
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance/:employeeId" element={<AttendanceDetails />} />
        <Route path="/present-summary" element={<PresentSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;