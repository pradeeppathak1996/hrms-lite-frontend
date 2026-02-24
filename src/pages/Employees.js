import { useEffect, useState } from "react";
import API from "../api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/employees/");

      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      } else if (Array.isArray(res.data.employees)) {
        setEmployees(res.data.employees);
      } else {
        setEmployees([]);
      }

      setError(null);
    } catch (err) {
      console.error("FETCH EMPLOYEES ERROR:", err);
      setEmployees([]);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const validateForm = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const deptRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    if (!idRegex.test(form.employee_id)) {
      alert("Employee ID must contain letters & numbers (e.g. EMP001)");
      return false;
    }
    if (!nameRegex.test(form.full_name)) {
      alert("Name should contain only letters");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      alert("Enter a valid email address");
      return false;
    }
    if (!deptRegex.test(form.department)) {
      alert("Department should contain only letters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await API.post("/employees/", form);
      await fetchEmployees();

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      alert("Employee added successfully");
    } catch (err) {
      console.error("ADD EMPLOYEE ERROR:", err.response?.data);

      const message =
        err.response?.data?.employee_id?.[0] ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.detail ||
        "Failed to add employee";

      alert(message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}/`);
      await fetchEmployees();
    } catch (err) {
      console.error("DELETE EMPLOYEE ERROR:", err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee Details</h2>

      <form onSubmit={handleSubmit} className="employee-form">
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value.toUpperCase() })
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

        <button type="submit" className="add-btn">
          Add Employee
        </button>
      </form>

      <h2>Employee List</h2>

      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
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
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
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