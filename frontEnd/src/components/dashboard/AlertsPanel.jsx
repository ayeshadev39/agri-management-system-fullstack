import { useSelector } from "react-redux";
import { daysRemaining } from "../../utils/formatters";

export default function AlertsPanel({ humidity }) {
  const crops = useSelector((state) => state.crops.crops);
  const tasks = useSelector((state) => state.tasks.tasks);
  const inventory = useSelector((state) => state.inventory.items);
  const alerts = [];

  if (humidity > 70) alerts.push({ type: "danger", icon: "water_drop", text: `High humidity (${humidity}%)` });
  if (humidity < 40) alerts.push({ type: "warning", icon: "water_drop", text: `Low humidity (${humidity}%)` });

  crops.forEach((crop) => {
    const days = daysRemaining(crop.cuttingDate);
    if (days >= 0 && days <= 3) alerts.push({ type: "warning", icon: "event", text: `${crop.name} cutting in ${days} day(s)` });
    if (crop.healthScore < 50) alerts.push({ type: "danger", icon: "warning", text: `${crop.name} health is critical` });
  });

  inventory.forEach((item) => {
    if (item.qty <= item.minQty) alerts.push({ type: "danger", icon: "inventory_2", text: `Low stock: ${item.item}` });
  });

  tasks.forEach((task) => {
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
    if (isOverdue) alerts.push({ type: "danger", icon: "task_alt", text: `Task Overdue: ${task.title}` });
  });

  const config = {
    danger: { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444" },
    warning: { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" },
  };

  return (
    <div className="glass-card p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Alerts</h6>
        <span className="material-icons text-danger">notifications</span>
      </div>
      {alerts.length === 0 ? (
        <p className="text-muted small">All clear — no alerts</p>
      ) : (
        <div className="d-flex flex-column gap-2" style={{ maxHeight: 200, overflowY: "auto" }}>
          {alerts.map((a, i) => {
            const c = config[a.type];
            return (
              <div key={i} className="d-flex align-items-center gap-3 p-2 rounded-3" style={{ background: c.bg }}>
                <span className="material-icons" style={{ color: c.color, fontSize: 18 }}>{a.icon}</span>
                <small className="fw-bold" style={{ color: c.color }}>{a.text}</small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}