import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto pt-5 pb-3" style={{ background: "#0f172a", borderTop: "1px solid #1e293b" }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="row g-4 mb-4">
          
          {/* 1. Brand & Description */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 40, height: 40, background: "rgba(46, 125, 50, 0.2)", color: "#4ade80" }}>
                <span className="material-icons fs-4">agriculture</span>
              </div>
              <h4 className="fw-bold mb-0 text-white">AgriSys</h4>
            </div>
            <p className="small mb-0" style={{ color: "#94a3b8", lineHeight: 1.6 }}>
              A smart agriculture management system for tracking weather, crop health, harvest progress, tasks, expenses, and supplier orders in real time.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><Link to="/dashboard" className="footer-link text-decoration-none small">Dashboard</Link></li>
              <li><Link to="/crops" className="footer-link text-decoration-none small">Crops</Link></li>
              <li><Link to="/harvest" className="footer-link text-decoration-none small">Harvest & Orders</Link></li>
              <li><Link to="/buyers" className="footer-link text-decoration-none small">Buyers</Link></li>
            </ul>
          </div>

          {/* 3. Features */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold mb-3 text-white">Features</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><Link to="/tasks" className="footer-link text-decoration-none small">Farm Tasks</Link></li>
              <li><Link to="/expenses" className="footer-link text-decoration-none small">Expenses</Link></li>
              <li><Link to="/inventory" className="footer-link text-decoration-none small">Inventory</Link></li>
              <li><Link to="/reports" className="footer-link text-decoration-none small">Reports & Logs</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3 text-white">Contact Us</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
              <li className="d-flex gap-2 small" style={{ color: "#94a3b8" }}>
                <span className="material-icons" style={{ fontSize: 18, color: "#4ade80" }}>location_on</span>
                <span>123 Agriculture Road, Lahore, Pakistan</span>
              </li>
              <li className="d-flex gap-2 small" style={{ color: "#94a3b8" }}>
                <span className="material-icons" style={{ fontSize: 18, color: "#4ade80" }}>email</span>
                <span>support@agrisys.com</span>
              </li>
              <li className="d-flex gap-2 small" style={{ color: "#94a3b8" }}>
                <span className="material-icons" style={{ fontSize: 18, color: "#4ade80" }}>phone</span>
                <span>+92 300 1234567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top pt-3 text-center" style={{ borderColor: "#1e293b !important" }}>
          <small style={{ color: "#64748b" }}>
            © {new Date().getFullYear()} <strong>AgriSys</strong>. All rights reserved.
          </small>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #94a3b8;
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #4ade80 !important;
          padding-left: 5px;
        }
      `}</style>
    </footer>
  );
}