import { useEffect } from "react";

export default function Toast({ show, message, type = "success", onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const config = {
    success: { bg: "bg-success", icon: "check_circle" },
    error: { bg: "bg-danger", icon: "error" },
    warning: { bg: "bg-warning", icon: "warning" },
    info: { bg: "bg-info", icon: "info" },
  }[type] || config?.success;

  const { bg, icon } = config;

  return (
    <div
      className={`toast show align-items-center text-white ${bg} border-0 position-fixed`}
      style={{ top: 20, right: 20, zIndex: 9999, minWidth: 280 }}
    >
      <div className="d-flex">
        <div className="toast-body d-flex align-items-center gap-2">
          <span className="material-icons">{icon}</span>
          {message}
        </div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}