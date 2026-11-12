import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../redux/actions/user";
import { appConfig } from "../../config/appConfig";

export default function Navbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✅ Naya Redux State Structure
  const user = useSelector((state) => state.user?.user);
  const role = useSelector((state) => state.user?.role);

  const handleLogout = () => {
    dispatch(LOGOUT(() => {
      navigate("/login");
    }));
  };

  return (
    <nav className="d-flex justify-content-between align-items-center px-4 py-3 sticky-top" style={{ background: "var(--card-bg)", borderBottom: "1px solid var(--border-color)", zIndex: 999 }}>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light d-lg-none rounded-circle" onClick={onMenuClick}>
          <span className="material-icons">menu</span>
        </button>
        <h5 className="fw-bold mb-0" style={{ color: "var(--text-main)" }}>{appConfig.tagline}</h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style={{ width: 40, height: 40, background: "var(--primary)" }}>
            {user ? user[0].toUpperCase() : "U"}
          </div>
          <div className="d-none d-md-block">
            {/* ✅ Ab user aur role sahi nazar aayenge */}
            <p className="mb-0 fw-bold small" style={{ color: "var(--text-main)" }}>{user || "Guest"}</p>
            <p className="mb-0 text-muted" style={{ fontSize: 11 }}>{role || "Visitor"}</p>
          </div>
        </div>

        <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}