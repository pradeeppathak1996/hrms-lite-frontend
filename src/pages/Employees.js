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
      // ✅ BACKEND returns ARRAY
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      alert("Error fetching employees");
      console.error(error);
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
      alert("Employee added");
    } catch (err) {
      alert("Error adding employee");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`employees/${id}/`);
    fetchEmployees();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />
        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />
        <button type="submit">Add</button>
      </form>

      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dept</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => handleDelete(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Employees;