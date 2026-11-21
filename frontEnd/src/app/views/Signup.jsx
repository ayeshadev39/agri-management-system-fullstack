import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../redux/api/axiosSetup";

export default function Signup() {
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", role: "manager" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Backend ko request bhej rahe hain
      const res = await axiosInstance.post("/users/register", form);
      
      if (res.data.succeeded) {
        alert("User created successfully!");
        navigate("/users"); // Add hone ke baad Users list par bhej dein
      }
    } catch (err) {
      // ✅ Asal error message show karein
      console.error("Signup Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed to create user. Check console.");
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
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" className="form-control" placeholder="Choose username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="row g-2 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Role</label>
              <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-premium w-100" disabled={loading}>
            {loading ? "Creating..." : "Register User"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/users" className="text-success fw-bold text-decoration-none small">Back to Users List</Link>
        </div>
      </div>
    </div>
  );
}