import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatters";

export default function StockProgressBar() {
  // ✅ || [] lagaya hai taake undefined par error na aaye
  const crops = useSelector((state) => state.crops.crops) || [];
  
  const withStock = crops.filter((c) => (c.harvestedQty || 0) > 0);

  return (
    <div className="glass-card p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Stock Progress</h6>
        <span className="material-icons text-info">bar_chart</span>
      </div>
      
      {withStock.length === 0 ? (
        <p className="text-muted small">No stock data available.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {withStock.map((crop) => {
            const percent = Math.min(100, Math.round((crop.soldQty / crop.harvestedQty) * 100));
            const remaining = crop.harvestedQty - crop.soldQty;
            return (
              <div key={crop.id}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div>
                    <span className="fw-semibold">{crop.name}</span>
                  </div>
                  <small className="text-muted">
                    <span className="fw-bold text-info">{formatNumber(crop.soldQty)}</span>
                    {" / "}
                    <span className="fw-bold">{formatNumber(crop.harvestedQty)}</span>
                  </small>
                </div>
                <div className="progress" style={{ height: 10, borderRadius: 5 }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${percent}%`,
                      background: percent >= 80 ? "#ef4444" : percent >= 50 ? "#f59e0b" : "#2e7d32",
                      borderRadius: 5,
                    }}
                  ></div>
                </div>
                <small className="text-muted">
                  {percent}% sold — {formatNumber(remaining)} remaining
                </small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}