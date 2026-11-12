import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumber, formatDate } from "../../utils/formatters";
import { ADDORDER, UPDATEORDER, REMOVEORDER } from "../../redux/actions/orders";
import StatCard from "../../components/common/StatCard";
import HarvestChart from "../../components/harvest/HarvestChart";
import StockProgressBar from "../../components/harvest/StockProgressBar";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function HarvestOrders() {
  const dispatch = useDispatch();
  
  // ✅ Naya Redux State
  const crops = useSelector((state) => state.crops.crops);
  const orders = useSelector((state) => state.orders.orders);
  const role = useSelector((state) => state.user.role);

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ buyerName: "", cropId: "", quantity: "", orderDate: "", status: "pending" });

  const totalHarvested = crops.reduce((s, c) => s + (c.harvestedQty || 0), 0);
  const totalSold = crops.reduce((s, c) => s + (c.soldQty || 0), 0);
  const remaining = totalHarvested - totalSold;
  
  const handleOpenForm = (order = null) => {
    if (order) { setEditingOrder(order); setForm(order); } 
    else { setEditingOrder(null); setForm({ buyerName: "", cropId: "", quantity: "", orderDate: "", status: "pending" }); }
    setShowForm(true);
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    if (!form.buyerName || !form.cropId || !form.quantity) return alert("Fill all fields");
    
    const payload = { ...form, quantity: Number(form.quantity) };
    
    if (editingOrder) {
      dispatch(UPDATEORDER({ ...payload, id: editingOrder.id }, () => setShowForm(false)));
    } else {
      dispatch(ADDORDER(payload, () => setShowForm(false)));
    }
  };

  return (
    <div className="animate-fade-up pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Harvest & Orders</h3>
          <p className="text-muted mb-0">Track harvest, sales and customer orders</p>
        </div>
        <button className="btn btn-premium d-flex align-items-center gap-1" onClick={() => handleOpenForm()}>
          <span className="material-icons" style={{ fontSize: 18 }}>add</span> New Order
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3 col-6"><StatCard icon="agriculture" title="Total Harvested" value={formatNumber(totalHarvested)} trend="units" color="#2e7d32" /></div>
        <div className="col-md-3 col-6"><StatCard icon="local_shipping" title="Total Sold" value={formatNumber(totalSold)} trend="units" color="#0288d1" /></div>
        <div className="col-md-3 col-6"><StatCard icon="inventory" title="Remaining Stock" value={formatNumber(remaining)} trend="units" color="#f9a825" /></div>
        <div className="col-md-3 col-6"><StatCard icon="receipt_long" title="Total Orders" value={orders.length} trend="all time" color="#8b5cf6" /></div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-7"><HarvestChart /></div>
        <div className="col-lg-5"><StockProgressBar /></div>
      </div>

      <div className="glass-card p-4">
        <h5 className="fw-bold mb-4">Recent Orders</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ color: "var(--text-main)" }}>
            <thead style={{ background: "var(--bg-color)" }}>
              <tr><th>Buyer</th><th>Crop</th><th>Qty</th><th>Date</th><th>Status</th><th className="text-end">Actions</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td className="fw-bold py-3">{o.buyerName}</td>
                  <td className="text-muted py-3">{crops.find(c => c.id === o.cropId)?.name || "Unknown"}</td>
                  <td className="fw-bold py-3">{o.quantity}</td>
                  <td className="text-muted small py-3">{formatDate(o.orderDate)}</td>
                  <td className="py-3">
                    <select 
                      className="form-select form-select-sm border-0 fw-bold" style={{ width: "130px", background: "var(--bg-color)", color: "var(--text-main)" }}
                      value={o.status} disabled={role !== "Admin"}
                      onChange={(e) => dispatch(UPDATEORDER({ id: o.id, status: e.target.value }))}
                    >
                      <option value="pending">Pending</option><option value="inTransit">In Transit</option><option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="text-end py-3">
                    {role === "Admin" ? (
                      <>
                        <button className="btn btn-sm btn-light text-primary me-1" onClick={() => handleOpenForm(o)}><span className="material-icons" style={{ fontSize: 18 }}>edit</span></button>
                        <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(o.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>
                      </>
                    ) : <span className="badge bg-secondary">View Only</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-0">
              <div className="modal-header border-0"><h5 className="modal-title fw-bold">{editingOrder ? "Edit Order" : "Create Order"}</h5><button className="btn-close" onClick={() => setShowForm(false)}></button></div>
              <div className="modal-body p-4">
                <form onSubmit={handleSaveOrder}>
                  <div className="mb-3"><label className="form-label small fw-bold">Buyer Name</label><input type="text" className="form-control" value={form.buyerName} onChange={e => setForm({...form, buyerName: e.target.value})} required /></div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Crop</label>
                    <select className="form-select" value={form.cropId} onChange={e => setForm({...form, cropId: e.target.value})} required>
                      <option value="">Select Crop</option>
                      {crops.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6"><label className="form-label small fw-bold">Quantity</label><input type="number" className="form-control" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required /></div>
                    <div className="col-6"><label className="form-label small fw-bold">Order Date</label><input type="date" className="form-control" value={form.orderDate} onChange={e => setForm({...form, orderDate: e.target.value})} required /></div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button type="button" className="btn btn-light px-4" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-premium px-4">{editingOrder ? "Update" : "Create"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal show={!!deleteId} title="Delete Order" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVEORDER(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}