import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-5 animate-fadeIn">
      <span className="material-icons text-warning" style={{ fontSize: 100 }}>error_outline</span>
      <h1 className="display-4 fw-bold mt-3">404</h1>
      <p className="text-muted mb-4">Page not found</p>
      <Link to="/" className="btn btn-primary-custom">
        Go to Dashboard
      </Link>
    </div>
  );
}