import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../api";

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data } = await api.get(`/complaints/${id}`);
        setComplaint(data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load complaint details");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="card">Loading complaint details...</div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="page">
        <div className="card">
          <p className="error">{error || "Complaint not found"}</p>
          <Link to="/student" className="btn-link">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <p className="eyebrow">Complaint Details</p>
        <h2>{complaint.category}</h2>

        <div className="detail-grid">
          <div className="detail-item">
            <p className="detail-label">Status</p>
            <p>{complaint.status}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Location</p>
            <p>{complaint.location}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Submitted On</p>
            <p>{new Date(complaint.createdAt).toLocaleString()}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Last Updated</p>
            <p>{new Date(complaint.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="detail-item detail-description">
          <p className="detail-label">Description</p>
          <p>{complaint.description}</p>
        </div>

        <div className="detail-item">
          <p className="detail-label">Image Proof</p>
          {complaint.imageUrl ? (
            <a
              href={`${API_BASE_URL.replace("/api", "")}${complaint.imageUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              View Uploaded Image
            </a>
          ) : (
            <p>N/A</p>
          )}
        </div>

        <Link to="/student" className="btn-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
