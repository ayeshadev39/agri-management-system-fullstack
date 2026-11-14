import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../redux/api/axiosSetup";

export default function Signup() {
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", role: "manager" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/register", form);
      if (res.data.succeeded) {
        alert("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 animate-fade-up" style={{ background: "var(--bg-color)" }}>
      <div className="glass-card p-5" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <span className="material-icons text-success" style={{ fontSize: "50px" }}>person_add</span>
          <h3 className="fw-bold mt-2">Register New User</h3>
          <p className="text-muted small">Only Admin can create accounts</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-3"><label className="form-label small fw-bold">Full Name</label><input type="text" className="form-control" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label small fw-bold">Username</label><input type="text" className="form-control" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></div>
          <div className="mb-3"><label className="form-label small fw-bold">Email</label><input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="row g-2 mb-4">
            <div className="col-md-6"><label className="form-label small fw-bold">Password</label><input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Role</label>
              <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-premium w-100" disabled={loading}>{loading ? "Creating..." : "Register User"}</button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-success fw-bold text-decoration-none small">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}