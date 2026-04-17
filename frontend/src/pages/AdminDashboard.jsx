import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const statuses = ["Pending", "In Progress", "Resolved"];

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const { user, logout } = useAuth();

  const fetchComplaints = async () => {
    const { data } = await api.get("/complaints");
    setComplaints(data);
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/complaints/${id}/status`, { status });
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <h2>Admin Dashboard - {user?.name}</h2>
        <button className="secondary" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="card">
        <h3>All Complaints</h3>
        {!complaints.length ? (
          <p>No complaints yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item._id}>
                    <td>{item.student?.name || "Unknown"}</td>
                    <td>{item.category}</td>
                    <td>{item.location}</td>
                    <td>{item.description}</td>
                    <td>
                      <select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)}>
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
