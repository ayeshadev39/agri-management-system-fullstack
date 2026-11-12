import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Backend skip kiya hua hai, isliye filhal direct message dikha rahe hain
    alert("Signup successful! (Backend not connected yet)");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 animate-fade-up" style={{ background: "var(--bg-color)" }}>
      <div className="glass-card p-5" style={{ width: "100%", maxWidth: "450px" }}>
        
        <div className="text-center mb-4">
          <span className="material-icons text-success" style={{ fontSize: "50px" }}>person_add</span>
          <h3 className="fw-bold mt-2">Create Account</h3>
          <p className="text-muted small">Join AgriSys today</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" className="form-control" placeholder="Choose a username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div className="row g-2 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Confirm Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
            </div>
          </div>

          <button type="submit" className="btn btn-premium w-100">Sign Up</button>
        </form>

        <div className="mt-4 text-center">
          <small className="text-muted">Already have an account? </small>
          <Link to="/login" className="text-success fw-bold text-decoration-none small">Login</Link>
        </div>

      </div>
    </div>
  );
}