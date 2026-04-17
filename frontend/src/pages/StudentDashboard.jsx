import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import NewComplaintPage from "./NewComplaintPage";

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const { user, logout } = useAuth();

  const fetchComplaints = async () => {
    const { data } = await api.get("/complaints/my");
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <h2>Welcome, {user?.name}</h2>
        <button className="secondary" onClick={logout}>
          Logout
        </button>
      </header>
      <NewComplaintPage onCreated={fetchComplaints} />

      <div className="card">
        <h3>My Complaints</h3>
        {!complaints.length ? (
          <p>No complaints submitted yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item._id}>
                    <td>{item.category}</td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>
                    <td>
                      {item.imageUrl ? (
                        <a href={`${API_BASE_URL.replace("/api", "")}${item.imageUrl}`} target="_blank" rel="noreferrer">
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
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

export default StudentDashboard;
