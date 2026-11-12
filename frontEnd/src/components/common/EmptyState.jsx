export default function EmptyState({ icon = "inbox", title = "No data", message = "Nothing to show here." }) {
  return (
    <div className="text-center py-5">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
        style={{ width: 80, height: 80, background: "#f1f5f9" }}
      >
        <span className="material-icons text-muted" style={{ fontSize: 40 }}>
          {icon}
        </span>
      </div>
      <h5 className="fw-bold text-dark mb-1">{title}</h5>
      <p className="text-muted mb-0">{message}</p>
    </div>
  );
}