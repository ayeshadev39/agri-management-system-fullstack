export default function WeatherCard({ weather, loading, error, lastUpdated, onRefresh }) {
  if (loading && !weather) return <div className="glass-card p-5 text-center">Loading weather...</div>;
  if (error && !weather) return <div className="glass-card p-5 text-center text-danger">Failed to load weather</div>;
  if (!weather) return null;

  const { current, daily } = weather;

  return (
    <div className="glass-card h-100 overflow-hidden position-relative animate-fade-up">
      <div className="p-4 position-relative" style={{ background: "linear-gradient(135deg, #0ea5e9, #2563eb)", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1 text-white opacity-75 text-uppercase fw-bold">Live Weather</h6>
            <h1 className="display-3 fw-bold mb-0">{Math.round(current.temperature_2m)}°C</h1>
            <p className="mb-0 opacity-75">Lahore, Pakistan</p>
          </div>
          <span className="material-icons" style={{ fontSize: "80px", opacity: 0.8 }}>wb_sunny</span>
        </div>
      </div>
      
      <div className="p-4 d-flex justify-content-between align-items-center">
        <div className="text-center">
          <span className="material-icons text-info">water_drop</span>
          <p className="mb-0 small fw-bold">{current.relative_humidity_2m}%</p>
          <small className="text-muted">Humidity</small>
        </div>
        <div className="text-center">
          <span className="material-icons text-secondary">air</span>
          <p className="mb-0 small fw-bold">{current.wind_speed_10m} km/h</p>
          <small className="text-muted">Wind</small>
        </div>
        <div className="text-center">
          <span className="material-icons text-primary">umbrella</span>
          <p className="mb-0 small fw-bold">{daily.precipitation_probability_max[0] || 0}%</p>
          <small className="text-muted">Rain</small>
        </div>
        <button onClick={onRefresh} className="btn btn-light rounded-circle shadow-sm p-2">
          <span className="material-icons text-primary">refresh</span>
        </button>
      </div>
    </div>
  );
}