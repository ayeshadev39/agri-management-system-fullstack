import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDCROP, UPDATECROP } from "../../redux/actions/crops"; // ✅ Naye Actions
import { createPortal } from "react-dom";

const empty = { name: "", field: "", plantingDate: "", cuttingDate: "", healthScore: 80, expectedQty: "", harvestedQty: "", soldQty: 0 };

export default function CropForm({ editing, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => { setForm(editing || empty); }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.field) return alert("Fill required fields");
    
    const payload = { ...form, healthScore: Number(form.healthScore), expectedQty: Number(form.expectedQty), harvestedQty: Number(form.harvestedQty) || 0 };
    
    if (editing) {
      dispatch(UPDATECROP({ ...payload, id: editing.id }, onClose));
    } else {
      dispatch(ADDCROP(payload, onClose));
    }
  };

  return createPortal(
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content glass-card border-0">
          <div className="modal-header border-0"><h5 className="modal-title fw-bold">{editing ? "Edit Crop" : "Add New Crop"}</h5><button className="btn-close" onClick={onClose}></button></div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label small fw-bold">Crop Name *</label><input name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="form-control" required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Field Name *</label><input name="field" value={form.field} onChange={e => setForm({...form, field: e.target.value})} className="form-control" required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Planting Date</label><input type="date" name="plantingDate" value={form.plantingDate} onChange={e => setForm({...form, plantingDate: e.target.value})} className="form-control" /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Cutting Date</label><input type="date" name="cuttingDate" value={form.cuttingDate} onChange={e => setForm({...form, cuttingDate: e.target.value})} className="form-control" /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Health Score (%)</label><input type="number" value={form.healthScore} onChange={e => setForm({...form, healthScore: e.target.value})} className="form-control" min="0" max="100" /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Expected Quantity</label><input type="number" value={form.expectedQty} onChange={e => setForm({...form, expectedQty: e.target.value})} className="form-control" /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Harvested Quantity</label><input type="number" value={form.harvestedQty} onChange={e => setForm({...form, harvestedQty: e.target.value})} className="form-control" /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Sold Quantity</label><input type="number" value={form.soldQty} onChange={e => setForm({...form, soldQty: e.target.value})} className="form-control" /></div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light px-4" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-premium px-4">{editing ? "Update" : "Add Crop"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>, document.body
  );
}