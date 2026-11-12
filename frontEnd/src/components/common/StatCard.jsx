import { useState } from "react";

export default function StatCard({ icon, title, value, trend, color = "#2e7d32" }) {
  const [hovered, setHovered] = useState(false);

  // Jab hover ho to dark background, warna white
  const cardStyle = {
    background: hovered ? color : "var(--card-bg)",
    color: hovered ? "white" : "var(--text-main)",
    borderColor: hovered ? color : "var(--border-color)",
    transition: "all 0.3s ease",
    transform: hovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: hovered ? `0 12px 20px ${color}40` : "var(--shadow)"
  };

  return (
    <div 
      className="glass-card p-4" 
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p 
            className="mb-1 text-uppercase small fw-bold" 
            style={{ color: hovered ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}
          >
            {title}
          </p>
          <h3 className="fw-bold mb-0" style={{ color: hovered ? "white" : "var(--text-main)" }}>
            {value}
          </h3>
          {trend && (
            <small 
              className="fw-semibold" 
              style={{ color: hovered ? "rgba(255,255,255,0.9)" : color }}
            >
              {trend}
            </small>
          )}
        </div>
        
        <div
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{ 
            width: 50, height: 50, 
            background: hovered ? "rgba(255,255,255,0.2)" : `${color}15`, 
            color: hovered ? "white" : color,
            transition: "all 0.3s ease"
          }}
        >
          <span className="material-icons fs-4">{icon}</span>
        </div>
      </div>
    </div>
  );
}