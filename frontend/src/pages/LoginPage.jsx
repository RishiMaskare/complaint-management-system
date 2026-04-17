import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      setAuth(data);
      navigate(data.user.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-info card">
        <p className="eyebrow">Smart Campus Complaint Management</p>
        <h2>Report. Track. Resolve.</h2>
        <p className="muted">
          Submit complaints, monitor status updates, and get issues resolved faster with a transparent digital workflow.
        </p>
      </section>

      <section className="card auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="College email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
