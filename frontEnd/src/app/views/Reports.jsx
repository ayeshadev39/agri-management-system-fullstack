import { useSelector } from "react-redux";
import { formatDateTime, formatNumber } from "../../utils/formatters";
import { exportToCsv } from "../../utils/exportCsv";

export default function Reports() {
  const crops = useSelector((state) => state.crops.crops) || [];
  const orders = useSelector((state) => state.orders.orders) || [];
  const expenses = useSelector((state) => state.expenses.expenses) || [];
  
  // ✅ Activity logs yahan se aa rahe hain
  const activity = useSelector((state) => state.activity.logs) || [];

  const totalHarvested = crops.reduce((s, c) => s + (c.harvestedQty || 0), 0);
  const totalSold = crops.reduce((s, c) => s + (c.soldQty || 0), 0);
  const totalExpense = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalRevenue = totalSold * 100;
  const netProfit = totalRevenue - totalExpense;

  const handleExportReport = () => {
    const reportData = [
      { Metric: "Total Harvested", Value: totalHarvested }, { Metric: "Total Sold", Value: totalSold },
      { Metric: "Total Revenue", Value: totalRevenue }, { Metric: "Total Expenses", Value: totalExpense },
      { Metric: "Net Profit", Value: netProfit },
    ];
    exportToCsv("Monthly_Report", reportData, [{ key: "Metric", label: "Metric" }, { key: "Value", label: "Value" }]);
  };

  return (
    <div className="animate-fade-up pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h3 className="fw-bold mb-1">Reports & Logs</h3><p className="text-muted mb-0">Financial summary and activity log</p></div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Monthly Summary</h5>
              <button className="btn btn-sm btn-outline-success" onClick={handleExportReport}><span className="material-icons" style={{ fontSize: 16 }}>download</span> CSV</button>
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="p-3 rounded-3 d-flex justify-content-between" style={{ background: "var(--bg-color)" }}><span className="text-muted">Total Harvested</span><span className="fw-bold">{formatNumber(totalHarvested)} units</span></div>
              <div className="p-3 rounded-3 d-flex justify-content-between" style={{ background: "var(--bg-color)" }}><span className="text-muted">Total Sold</span><span className="fw-bold">{formatNumber(totalSold)} units</span></div>
              <div className="p-3 rounded-3 d-flex justify-content-between" style={{ background: "var(--bg-color)" }}><span className="text-muted">Total Expenses</span><span className="fw-bold text-danger">Rs. {formatNumber(totalExpense)}</span></div>
              <div className="p-3 rounded-3 d-flex justify-content-between align-items-center" style={{ background: netProfit >= 0 ? "rgba(46, 125, 50, 0.1)" : "rgba(239, 68, 68, 0.1)" }}>
                <span className="fw-bold">Net Profit / Loss</span><h4 className={`mb-0 fw-bold ${netProfit >= 0 ? "text-success" : "text-danger"}`}>Rs. {formatNumber(netProfit)}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-4">Activity Log</h5>
            <div className="d-flex flex-column gap-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {activity.length === 0 ? <p className="text-muted text-center py-4">No activity recorded yet.</p> : (
                activity.map((log) => (
                  <div key={log.id} className="d-flex gap-3 p-3 rounded-3 align-items-start" style={{ background: "var(--bg-color)" }}>
                    <div className="bg-primary rounded-circle mt-1" style={{ width: 8, height: 8, flexShrink: 0 }}></div>
                    <div>
                      <p className="mb-1 fw-bold small">{log.action}</p><small className="text-muted d-block">{log.entity}</small>
                      <small className="text-muted" style={{ fontSize: "0.7rem" }}>{log.user} • {formatDateTime(log.timestamp)}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}