import { useSelector } from "react-redux";
import { formatDate, daysRemaining } from "../../utils/formatters";

export default function CuttingSchedule() {
  const crops = useSelector((state) => state.crops.crops);
  const sorted = [...crops].sort((a, b) => new Date(a.cuttingDate) - new Date(b.cuttingDate)).slice(0, 5);

  return (
    <div className="glass-card p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Upcoming Harvest</h6>
        <span className="material-icons text-warning">event</span>
      </div>
      {sorted.length === 0 ? (
        <p className="text-muted">No crops scheduled.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {sorted.map((crop) => {
            const days = daysRemaining(crop.cuttingDate);
            const isOverdue = days < 0;
            const isSoon = days >= 0 && days <= 3;
            return (
              <div key={crop.id} className="d-flex justify-content-between align-items-center p-2 rounded" style={{ background: "var(--bg-color)" }}>
                <div>
                  <p className="fw-bold mb-0 small">{crop.name}</p>
                  <small className="text-muted">{formatDate(crop.cuttingDate)}</small>
                </div>
                <span className="badge rounded-pill" style={{ background: isOverdue ? "#fee2e2" : isSoon ? "#fef3c7" : "rgba(46, 125, 50, 0.1)", color: isOverdue ? "#991b1b" : isSoon ? "#92400e" : "var(--primary)" }}>
                  {isOverdue ? `${Math.abs(days)}d overdue` : `${days}d left`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}