export default function HumidityGauge({ humidity, loading }) {
  if (loading) return <div className="glass-card p-4 text-center h-100 d-flex align-items-center justify-content-center">Loading...</div>;
  if (humidity === null || humidity === undefined) return null;

  const getStatus = () => {
    if (humidity < 40) return { label: "Low", color: "#f59e0b", icon: "trending_down", text: "Irrigation required" };
    if (humidity <= 70) return { label: "Optimal", color: "#2e7d32", icon: "check_circle", text: "Ideal conditions" };
    return { label: "High", color: "#ef4444", icon: "trending_up", text: "Disease risk" };
  };

  const status = getStatus();
  const circumference = 2 * Math.PI * 60; // Circle ka size
  const offset = circumference - (humidity / 100) * circumference;

  return (
    <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6 className="fw-bold mb-0">Humidity</h6>
          <small className="text-muted">Air moisture level</small>
        </div>
        <span className="material-icons text-info">water_drop</span>
      </div>

      <div className="d-flex justify-content-center position-relative my-2">
        <svg width="150" height="150" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="75" cy="75" r="60" fill="none" stroke="var(--border-color)" strokeWidth="12" />
          <circle
            cx="75"
            cy="75"
            r="60"
            fill="none"
            stroke={status.color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div
          className="position-absolute d-flex flex-column align-items-center justify-content-center"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <h2 className="fw-bold mb-0" style={{ color: status.color }}>
            {humidity}%
          </h2>
          <small className="text-muted fw-bold">Humidity</small>
        </div>
      </div>

      <div className="text-center mt-2">
        <span
          className="badge rounded-pill d-inline-flex align-items-center gap-1"
          style={{ background: `${status.color}15`, color: status.color, padding: "8px 16px" }}
        >
          <span className="material-icons" style={{ fontSize: 16 }}>{status.icon}</span>
          {status.label}
        </span>
        <p className="text-muted small mt-2 mb-0">{status.text}</p>
      </div>
    </div>
  );
}