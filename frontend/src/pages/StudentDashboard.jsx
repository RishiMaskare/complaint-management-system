import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import NewComplaintPage from "./NewComplaintPage";

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useAuth();

  const fetchComplaints = async () => {
    const { data } = await api.get("/complaints/my");
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const pendingCount = complaints.filter((item) => item.status === "Pending").length;
  const inProgressCount = complaints.filter((item) => item.status === "In Progress").length;
  const resolvedCount = complaints.filter((item) => item.status === "Resolved").length;

  return (
    <div className="page">
      <header className="page-header card hero-card">
        <div>
          <p className="eyebrow">Student Dashboard</p>
          <h2>Welcome back, {user?.name}</h2>
          <p className="muted">Raise and track your complaints in one place.</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p>Total Complaints</p>
          <h3>{complaints.length}</h3>
        </article>
        <article className="stat-card">
          <p>Pending</p>
          <h3>{pendingCount}</h3>
        </article>
        <article className="stat-card">
          <p>In Progress</p>
          <h3>{inProgressCount}</h3>
        </article>
        <article className="stat-card">
          <p>Resolved</p>
          <h3>{resolvedCount}</h3>
        </article>
      </section>

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
