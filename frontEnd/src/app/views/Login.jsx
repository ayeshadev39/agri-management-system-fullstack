import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link import kiya
import { LOGIN } from "../../redux/actions/user";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loginLoading, loginError } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LOGIN(form, () => {
      navigate("/dashboard");
    }, (err) => {
      alert(err);
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 animate-fade-up" style={{ background: "var(--bg-color)" }}>
      <div className="glass-card p-5" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <span className="material-icons text-success" style={{ fontSize: "50px" }}>agriculture</span>
          <h3 className="fw-bold mt-2">Welcome Back</h3>
          <p className="text-muted small">Login to AgriSys Dashboard</p>
        </div>

        {loginError && <div className="alert alert-danger py-2 small">{loginError}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" className="form-control form-control-lg" placeholder="admin or manager" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          
          <button type="submit" className="btn btn-premium w-100 d-flex justify-content-center align-items-center gap-2" disabled={loginLoading}>
            {loginLoading ? (
              <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...</>
            ) : ("Login")}
          </button>
        </form>

        <div className="mt-4 text-center">
          <small className="text-muted d-block">Admin: admin / admin123</small>
          <small className="text-muted d-block">Manager: manager / manager123</small>
          <hr className="my-3" />
          {/* ✅ PDF Requirement: Link on the Login page */}
          <Link to="/signup" className="text-success fw-bold text-decoration-none small">Create New Account</Link>
        </div>
      </div>
    </div>
  );
}