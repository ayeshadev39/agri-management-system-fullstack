import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVECROP } from "../../redux/actions/crops";
import StatusBadge from "../common/StatusBadge";
import SearchBar from "../common/SearchBar";
import ConfirmModal from "../common/ConfirmModal";
import { useDebounce } from "../../hooks/useDebounce";
import { formatDate, formatNumber } from "../../utils/formatters";

export default function CropTable({ onEdit, onAdd }) {
  const dispatch = useDispatch();
  
  // ✅ Safe check aur Backend role (chote 'admin' ke liye)
  const crops = useSelector((state) => state.crops.crops) || [];
  const role = useSelector((state) => state.user.role) || "";
  
  const [search, setSearch] = useState("");
  const [filterHealth, setFilterHealth] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(search, 300);

  const getStatus = (score) => {
    if (score >= 80) return { label: "Healthy", variant: "healthy" };
    if (score >= 50) return { label: "Needs Attention", variant: "warning" };
    return { label: "Critical", variant: "critical" };
  };

  const filtered = useMemo(() => {
    let result = crops.filter((c) => 
      (c.name || "").toLowerCase().includes(debouncedSearch.toLowerCase()) || 
      (c.field || "").toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if (filterHealth !== "all") result = result.filter((c) => 
      filterHealth === "healthy" ? c.healthScore >= 80 : 
      filterHealth === "warning" ? (c.healthScore >= 50 && c.healthScore < 80) : 
      c.healthScore < 50
    );
    return result;
  }, [crops, debouncedSearch, filterHealth]);

  return (
    <div className="glass-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">All Crops</h5>
        <button className="btn btn-premium d-flex align-items-center gap-1" onClick={onAdd}>
          <span className="material-icons" style={{ fontSize: 18 }}>add</span> Add Crop
        </button>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-8"><SearchBar value={search} onChange={setSearch} placeholder="Search by crop or field..." /></div>
        <div className="col-md-4">
          <select className="form-select" value={filterHealth} onChange={(e) => setFilterHealth(e.target.value)}>
            <option value="all">All Health</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Needs Attention</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" style={{ color: "var(--text-main)" }}>
          <thead style={{ background: "var(--bg-color)", color: "var(--text-muted)" }}>
            <tr>
              <th className="py-3">Crop</th><th className="py-3">Field</th><th className="py-3">Health</th>
              <th className="py-3">Cutting Date</th><th className="py-3">Stock</th><th className="text-end py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((crop) => {
              const status = getStatus(crop.healthScore);
              // ✅ Ab check chote "admin" ke liye bhi kaam karega
              const isAdmin = role === "Admin" || role === "admin";
              
              return (
                <tr key={crop.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td className="fw-bold py-3">{crop.name}</td>
                  <td className="text-muted py-3">{crop.field}</td>
                  <td className="py-3"><div className="d-flex gap-2"><StatusBadge label={status.label} variant={status.variant} /><small className="fw-bold">{crop.healthScore}%</small></div></td>
                  <td className="text-muted small py-3">{formatDate(crop.cuttingDate)}</td>
                  <td className="fw-bold text-success py-3">{formatNumber((crop.harvestedQty || 0) - (crop.soldQty || 0))}</td>
                  <td className="text-end py-3">
                    {isAdmin ? (
                      <>
                        <button className="btn btn-sm btn-light text-primary me-1" onClick={() => onEdit(crop)}><span className="material-icons" style={{ fontSize: 18 }}>edit</span></button>
                        <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(crop.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>
                      </>
                    ) : <span className="badge bg-secondary">View Only</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmModal show={!!deleteId} title="Delete Crop" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVECROP(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}