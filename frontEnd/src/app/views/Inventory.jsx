import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDITEM, REMOVEITEM, UPDATEITEM } from "../../redux/actions/inventory";
import { ADDLOG } from "../../redux/actions/activity"; // ✅ Import ADDLOG
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Inventory() {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.items) || [];
  const role = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user.user) || "System";

  const [form, setForm] = useState({ item: "", type: "Fertilizer", qty: "", minQty: "", unit: "kg" });
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const payload = { ...form, qty: Number(form.qty), minQty: Number(form.minQty) };
    
    dispatch(ADDITEM(payload, () => {
      // ✅ Jab item add ho jaye, to foran log save karein
      dispatch(ADDLOG({
        user: user,
        action: "Added INVENTORY",
        entity: form.item
      }));
      setForm({ item: "", type: "Fertilizer", qty: "", minQty: "", unit: "kg" });
    }));
  };

  const handleUpdateStock = (item, amount) => {
    const newQty = item.qty + amount;
    if (newQty < 0) return alert("Not enough stock!");
    dispatch(UPDATEITEM({ id: item.id, qty: newQty }));
  };

  return (
    <div className="animate-fade-up pb-5">
      <div className="mb-4"><h3 className="fw-bold mb-1">Inputs Inventory</h3><p className="text-muted mb-0">Manage seeds, fertilizers and pesticides</p></div>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">Add New Item</h5>
            <form onSubmit={handleAdd}>
              <div className="mb-3"><label className="form-label small fw-bold">Item Name</label><input type="text" className="form-control" value={form.item} onChange={e => setForm({...form, item: e.target.value})} required /></div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Type</label>
                <select className="form-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="Fertilizer">Fertilizer</option><option value="Pesticide">Pesticide</option><option value="Seed">Seed</option>
                </select>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6"><label className="form-label small fw-bold">Qty</label><input type="number" className="form-control" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} required /></div>
                <div className="col-6"><label className="form-label small fw-bold">Min Alert</label><input type="number" className="form-control" value={form.minQty} onChange={e => setForm({...form, minQty: e.target.value})} required /></div>
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold">Unit</label>
                <select className="form-select" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                  <option value="kg">kg</option><option value="liters">liters</option><option value="bags">bags</option>
                </select>
              </div>
              <button type="submit" className="btn btn-premium w-100">Add Item</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-4">Current Stock</h5>
            <div className="row g-3">
              {inventory.map(item => {
                const isLow = item.qty <= item.minQty;
                return (
                  <div className="col-md-6" key={item.id}>
                    <div className="p-3 rounded-3 h-100 position-relative" style={{ background: "var(--bg-color)", border: isLow ? "1px solid #ef4444" : "1px solid var(--border-color)" }}>
                      {isLow && <span className="badge bg-danger position-absolute top-0 end-0 m-2">Low Stock</span>}
                      <h6 className="fw-bold mb-1">{item.item}</h6><small className="text-muted d-block mb-3">{item.type}</small>
                      <div className="d-flex justify-content-between align-items-end">
                        <div><h3 className={`mb-0 fw-bold ${isLow ? 'text-danger' : 'text-success'}`}>{item.qty} <small className="fs-6 text-muted">{item.unit}</small></h3><small className="text-muted">Min: {item.minQty}</small></div>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-light text-success" onClick={() => handleUpdateStock(item, 1)}><span className="material-icons" style={{ fontSize: 18 }}>add_circle</span></button>
                          <button className="btn btn-sm btn-light text-primary" onClick={() => handleUpdateStock(item, -1)}><span className="material-icons" style={{ fontSize: 18 }}>remove_circle</span></button>
                          {role === "Admin" && <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(item.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal show={!!deleteId} title="Delete Item" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVEITEM(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}