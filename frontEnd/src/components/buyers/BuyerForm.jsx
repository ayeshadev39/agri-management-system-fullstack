import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDBUYER, UPDATEBUYER } from "../../redux/actions/buyers";
import { createPortal } from "react-dom";
import CnicInput from "./CnicInput";
import ImageUpload from "./ImageUpload";

export default function BuyerForm({ editing, onClose }) {
  const dispatch = useDispatch();
  const crops = useSelector((state) => state.crops.crops); // ✅
  const [form, setForm] = useState({ name: "", cnic: "", imageBase64: "", cropId: "", quantity: "", date: "" });
  const [preview, setPreview] = useState(null);

  useEffect(() => { 
    if(editing) { setForm(editing); setPreview(editing.imageBase64); }
    else { setForm({ name: "", cnic: "", imageBase64: "", cropId: "", quantity: "", date: new Date().toISOString().split("T")[0] }); setPreview(null); }
  }, [editing]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setPreview(reader.result); setForm({ ...form, imageBase64: reader.result }); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, quantity: Number(form.quantity) };
    if (editing) dispatch(UPDATEBUYER({ ...payload, id: editing.id }, onClose));
    else dispatch(ADDBUYER(payload, onClose));
  };

  return createPortal(
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content glass-card border-0">
          <div className="modal-header border-0"><h5 className="modal-title fw-bold">{editing ? "Edit Buyer" : "Add New Buyer"}</h5><button className="btn-close" onClick={onClose}></button></div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label small fw-bold">Full Name *</label><input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div className="col-md-6"><CnicInput value={form.cnic} onChange={(val) => setForm({...form, cnic: val})} /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Crop *</label><select className="form-select" value={form.cropId} onChange={e => setForm({...form, cropId: e.target.value})} required><option value="">Select Crop</option>{crops.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                <div className="col-md-3"><label className="form-label small fw-bold">Quantity *</label><input type="number" className="form-control" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required /></div>
                <div className="col-md-3"><label className="form-label small fw-bold">Date *</label><input type="date" className="form-control" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
                <div className="col-12 mt-4"><ImageUpload preview={preview} onChange={handleImage} onRemove={() => { setPreview(null); setForm({...form, imageBase64: ""}); }} /></div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light px-4" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-premium px-4">{editing ? "Update" : "Save Buyer"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>, document.body
  );
}