export default function StatusBadge({ label, variant }) {
  const styles = {
    healthy: { bg: "rgba(16, 185, 129, 0.15)", color: "#10b981" },
    warning: { bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" },
    critical: { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444" },
    pending: { bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" },
    delivered: { bg: "rgba(16, 185, 129, 0.15)", color: "#10b981" },
    transit: { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" },
  };

  const current = styles[variant] || styles.pending;

  return (
    <span 
      className="badge rounded-pill px-3 py-2" 
      style={{ background: current.bg, color: current.color, fontWeight: "600", fontSize: "0.75rem" }}
    >
      {label}
    </span>
  );
}