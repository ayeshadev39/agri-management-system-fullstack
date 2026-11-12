import { useState } from "react";

export default function ForecastStrip({ weather, loading }) {
  const [selectedDay, setSelectedDay] = useState(null);

  if (loading) return <div className="glass-card p-4 text-center">Loading forecast...</div>;
  if (!weather?.daily) return null;

  const { daily } = weather;

  const getIcon = (code) => {
    if (code === 0) return "wb_sunny";
    if (code <= 3) return "cloud";
    if (code <= 48) return "foggy";
    if (code <= 67) return "water_drop";
    if (code <= 77) return "ac_unit";
    if (code <= 82) return "grain";
    return "thunderstorm";
  };

  const getDay = (dateStr, i) => {
    if (i === 0) return "Today";
    if (i === 1) return "Tomorrow";
    return new Date(dateStr).toLocaleDateString("en-PK", { weekday: "short" });
  };

  return (
    <>
      <div className="glass-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">5-Day Forecast</h6>
          <span className="material-icons text-warning">calendar_month</span>
        </div>
        <div className="row g-3">
          {daily.time.map((date, i) => (
            <div key={i} className="col">
              <div 
                className="p-3 rounded-3 text-center h-100" 
                style={{ background: "var(--bg-color)", cursor: "pointer", transition: "all 0.2s", border: "1px solid var(--border-color)" }}
                onClick={() => setSelectedDay(i)}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
              >
                <p className="mb-1 small fw-bold text-muted">{getDay(date, i)}</p>
                <span className="material-icons text-warning my-2" style={{ fontSize: 32 }}>{getIcon(daily.weather_code[i])}</span>
                <p className="mb-0 fw-bold">{Math.round(daily.temperature_2m_max[i])}°</p>
                <small className="text-muted">{Math.round(daily.temperature_2m_min[i])}°</small>
                {/* ✅ Humidity Show Kar Rahe Hain */}
                {daily.relative_humidity_2m_mean && (
                  <div className="mt-2 text-info" style={{ fontSize: '0.75rem' }}>
                    <span className="material-icons" style={{ fontSize: 12, verticalAlign: 'middle' }}>water_drop</span> {Math.round(daily.relative_humidity_2m_mean[i])}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Weather Modal */}
      {selectedDay !== null && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{getDay(daily.time[selectedDay], selectedDay)} Weather</h5>
                <button className="btn-close" onClick={() => setSelectedDay(null)}></button>
              </div>
              <div className="modal-body text-center p-4">
                <span className="material-icons text-warning" style={{ fontSize: 80 }}>{getIcon(daily.weather_code[selectedDay])}</span>
                <h1 className="display-4 fw-bold mb-0">{Math.round(daily.temperature_2m_max[selectedDay])}°C</h1>
                <p className="text-muted mb-4">Max Temperature</p>
                
                <div className="d-flex justify-content-center gap-4 text-start">
                  <div>
                    <small className="text-muted d-block">Min Temp</small>
                    <span className="fw-bold fs-5">{Math.round(daily.temperature_2m_min[selectedDay])}°C</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">Rain Chance</small>
                    <span className="fw-bold fs-5">{daily.precipitation_probability_max[selectedDay]}%</span>
                  </div>
                  {daily.relative_humidity_2m_mean && (
                    <div>
                      <small className="text-muted d-block">Humidity</small>
                      <span className="fw-bold fs-5 text-info">{Math.round(daily.relative_humidity_2m_mean[selectedDay])}%</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-premium w-100" onClick={() => setSelectedDay(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}