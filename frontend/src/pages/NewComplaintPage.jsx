import { useState } from "react";
import api from "../api";

const categories = ["Electricity", "Water", "Classroom", "Hostel", "Cleanliness", "Other"];

const NewComplaintPage = ({ onCreated }) => {
  const [form, setForm] = useState({
    category: "Electricity",
    location: "",
    description: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const payload = new FormData();
      payload.append("category", form.category);
      payload.append("location", form.location);
      payload.append("description", form.description);
      if (form.image) payload.append("image", form.image);

      await api.post("/complaints", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ category: "Electricity", location: "", description: "", image: null });
      setMessage("Complaint submitted successfully.");
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit complaint");
    }
  };

  return (
    <div className="card">
      <h3>Submit New Complaint</h3>
      <p className="muted">Attach details and image proof to speed up resolution.</p>
      <form onSubmit={handleSubmit} className="grid-form">
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location (e.g., Hostel Block A)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <textarea
          placeholder="Describe the issue clearly"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
        />
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default NewComplaintPage;
