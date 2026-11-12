import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import ConfirmModal from "../common/ConfirmModal";
import SearchBar from "../common/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import { formatDate, formatNumber } from "../../utils/formatters";
import { appConfig } from "../../config/appConfig";

export default function OrdersTable({ onEdit }) {
  const { orders, crops, updateOrder, deleteOrder } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const getCropName = (cropId) => crops.find((c) => c.id === cropId)?.name || "-";

  const getStatusVariant = (status) => {
    if (status === "delivered") return "delivered";
    if (status === "inTransit") return "transit";
    return "pending";
  };

  const filtered = useMemo(() => {
    let result = orders.filter((o) =>
      (o.buyerName || "").toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if (filterStatus !== "all") {
      result = result.filter((o) => o.status === filterStatus);
    }
    return result.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }, [orders, debouncedSearch, filterStatus]);

  return (
    <div className="card card-custom p-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-0">All Orders</h6>
          <small className="text-muted">{filtered.length} of {orders.length}</small>
        </div>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by buyer name..." />
        </div>
        <div className="col-md-6">
          <select
            className="form-control form-control-custom"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            {Object.entries(appConfig.orderStatuses).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="receipt_long" title="No orders" message="Create your first order above" />
      ) : (
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="fw-semibold">{o.buyerName}</td>
                  <td className="text-muted">{getCropName(o.cropId)}</td>
                  <td className="fw-semibold">{formatNumber(o.quantity)}</td>
                  <td className="text-muted small">{formatDate(o.orderDate)}</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrder(o.id, { status: e.target.value })}
                      className="form-select form-select-sm border-0 fw-semibold"
                      style={{ width: 130 }}
                    >
                      {Object.entries(appConfig.orderStatuses).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-light rounded-3 text-primary"
                        onClick={() => onEdit(o)}
                      >
                        <span className="material-icons" style={{ fontSize: 18 }}>edit</span>
                      </button>
                      <button
                        className="btn btn-sm btn-light rounded-3 text-danger"
                        onClick={() => setDeleteId(o.id)}
                      >
                        <span className="material-icons" style={{ fontSize: 18 }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        show={!!deleteId}
        title="Delete Order"
        message="Are you sure you want to delete this order?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          deleteOrder(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}