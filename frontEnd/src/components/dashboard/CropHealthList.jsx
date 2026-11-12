import { useSelector } from "react-redux";
import StatusBadge from "../common/StatusBadge";

export default function CropHealthList() {
  const crops = useSelector((state) => state.crops.crops); // ✅ state.crops.crops

  const getStatus = (score) => {
    if (score >= 80) return { label: "Healthy", variant: "healthy", color: "#2e7d32" };
    if (score >= 50) return { label: "Needs Attention", variant: "warning", color: "#f59e0b" };
    return { label: "Critical", variant: "critical", color: "#ef4444" };
  };

  return (
    <div className="glass-card p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Crop Health</h6>
        <span className="material-icons text-success">grass</span>
      </div>
      {crops.length === 0 ? (
        <p className="text-muted">No crops added yet.</p>
      ) : (
        <div className="d-flex flex-column gap-3" style={{ maxHeight: 300, overflowY: "auto" }}>
          {crops.map((crop) => {
            const status = getStatus(crop.healthScore);
            return (
              <div key={crop.id} className="p-3 rounded-3" style={{ background: "var(--bg-color)" }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <p className="fw-bold mb-0">{crop.name}</p>
                    <small className="text-muted">{crop.field}</small>
                  </div>
                  <StatusBadge label={status.label} variant={status.variant} />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="progress flex-grow-1" style={{ height: 6 }}>
                    <div className="progress-bar" style={{ width: `${crop.healthScore}%`, background: status.color }}></div>
                  </div>
                  <small className="fw-bold" style={{ color: status.color, minWidth: 40 }}>{crop.healthScore}%</small>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}