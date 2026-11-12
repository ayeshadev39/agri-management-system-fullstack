import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDEQUIPMENT, REMOVEEQUIPMENT, UPDATEEQUIPMENT } from "../../../redux/actions/equipment";
import ConfirmModal from "../../../components/common/ConfirmModal";

export default function Equipment() {
  const dispatch = useDispatch();
  const equipment = useSelector((state) => state.equipment.equipment);
  const role = useSelector((state) => state.user.role);

  const [form, setForm] = useState({ name: "", type: "Tractor", purchaseDate: "", status: "Active", lastServiceDate: "", serviceIntervalDays: "" });
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name is required");
    const payload = { ...form, serviceIntervalDays: Number(form.serviceIntervalDays) };

    if (editing) {
      dispatch(UPDATEEQUIPMENT({ ...payload, id: editing.id }, () => { setEditing(null); setForm({ name: "", type: "Tractor", purchaseDate: "", status: "Active", lastServiceDate: "", serviceIntervalDays: "" }); }));
    } else {
      dispatch(ADDEQUIPMENT(payload, () => setForm({ name: "", type: "Tractor", purchaseDate: "", status: "Active", lastServiceDate: "", serviceIntervalDays: "" })));
    }
  };

  return (
    <div className="animate-fade-up pb-5">
      <div className="mb-4"><h3 className="fw-bold mb-1">Equipment & Machinery</h3><p className="text-muted mb-0">Track tractors, pumps and maintenance schedules</p></div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">{editing ? "Edit Equipment" : "Add Equipment"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><label className="form-label small fw-bold">Name *</label><input type="text" className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Type</label>
                <select className="form-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="Tractor">Tractor</option><option value="Water Pump">Water Pump</option><option value="Sprayer">Sprayer</option><option value="Harvester">Harvester</option><option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Status</label>
                <select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="Active">Active</option><option value="Under Repair">Under Repair</option><option value="Idle">Idle</option>
                </select>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6"><label className="form-label small fw-bold">Last Service</label><input type="date" className="form-control" value={form.lastServiceDate} onChange={e => setForm({...form, lastServiceDate: e.target.value})} /></div>
                <div className="col-6"><label className="form-label small fw-bold">Interval (Days)</label><input type="number" className="form-control" placeholder="e.g. 90" value={form.serviceIntervalDays} onChange={e => setForm({...form, serviceIntervalDays: e.target.value})} /></div>
              </div>
              <button type="submit" className="btn btn-premium w-100">{editing ? "Update" : "Add Equipment"}</button>
              {editing && <button type="button" className="btn btn-light w-100 mt-2" onClick={() => { setEditing(null); setForm({ name: "", type: "Tractor", purchaseDate: "", status: "Active", lastServiceDate: "", serviceIntervalDays: "" }); }}>Cancel</button>}
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-4">Machinery List</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ color: "var(--text-main)" }}>
                <thead style={{ background: "var(--bg-color)" }}>
                  <tr><th>Name</th><th>Type</th><th>Status</th><th>Service</th><th className="text-end">Actions</th></tr>
                </thead>
                <tbody>
                  {equipment.map(eq => {
                    const nextService = eq.lastServiceDate && eq.serviceIntervalDays ? new Date(new Date(eq.lastServiceDate).getTime() + eq.serviceIntervalDays * 86400000).toLocaleDateString() : "-";
                    return (
                      <tr key={eq.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td className="fw-bold">{eq.name}</td>
                        <td>{eq.type}</td>
                        <td><span className={`badge ${eq.status === 'Active' ? 'bg-success' : eq.status === 'Under Repair' ? 'bg-danger' : 'bg-secondary'}`}>{eq.status}</span></td>
                        <td className="small text-muted">Next: {nextService}</td>
                        <td className="text-end">
                          {role === "Admin" && (
                            <>
                              <button className="btn btn-sm btn-light text-primary me-1" onClick={() => { setEditing(eq); setForm(eq); }}><span className="material-icons" style={{ fontSize: 18 }}>edit</span></button>
                              <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(eq.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal show={!!deleteId} title="Delete Equipment" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVEEQUIPMENT(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}