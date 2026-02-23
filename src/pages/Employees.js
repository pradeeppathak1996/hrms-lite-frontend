import { useEffect, useState } from "react";
import API from "../api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      // ✅ DRF default response = array
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      alert("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("employees/", form);
      fetchEmployees();
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
    } catch (error) {
      alert("Error adding employee");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`employees/${id}/`);
      fetchEmployees();
    } catch (error) {
      alert("Error deleting employee");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Employee ID" value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
        <input placeholder="Full Name" value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Department" value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <button type="submit">Add</button>
      </form>

      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <ul>
          {employees.map(emp => (
            <li key={emp.id}>
              {emp.full_name} ({emp.department})
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Employees;