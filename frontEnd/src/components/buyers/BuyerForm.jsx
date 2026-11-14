import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADDBUYER, UPDATEBUYER } from "../../redux/actions/buyers";
import CnicInput from "./CnicInput";
import ImageUpload from "./ImageUpload";

const empty = { name: "", cnic: "", cropId: "", quantity: "", date: "" };

export default function BuyerForm({ editing, onClose }) {
  const dispatch = useDispatch();
  const crops = useSelector((state) => state.crops.crops) || [];
  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm(editing);
      setPreview(editing.imageBase64 || null);
      setImageFile(null);
    } else {
      setForm({ ...empty, date: new Date().toISOString().split("T")[0] });
      setPreview(null);
      setImageFile(null);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleCnicChange = (value) => {
    setForm({ ...form, cnic: value });
    setErrors({ ...errors, cnic: null });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return setErrors({ ...errors, image: "Image must be less than 1 MB" });
    setImageFile(file);
    setErrors({ ...errors, image: null });
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const validate = () => {
    const err = {};
    if (!form.name || form.name.length < 3) err.name = "Name required (min 3 chars)";
    if (!form.cnic || form.cnic.length < 15) err.cnic = "Valid CNIC required";
    if (!form.cropId) err.cropId = "Select a crop";
    if (!form.quantity || form.quantity <= 0) err.quantity = "Valid quantity required";
    if (!form.date) err.date = "Date required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const buyerData = { name: form.name.trim(), cnic: form.cnic, cropId: form.cropId, quantity: Number(form.quantity), date: form.date };

    if (editing) {
      dispatch(UPDATEBUYER({ id: editing.id, ...buyerData }, onClose));
    } else {
      dispatch(ADDBUYER({ buyerData, imageFile }, onClose));
    }
  };

  return createPortal(
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content glass-card border-0">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">{editing ? "Edit Buyer" : "Add New Buyer"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label small fw-bold">Full Name *</label><input name="name" value={form.name} onChange={handleChange} className={`form-control ${errors.name ? "is-invalid" : ""}`} />{errors.name && <small className="text-danger">{errors.name}</small>}</div>
                <div className="col-md-6"><CnicInput value={form.cnic} onChange={handleCnicChange} error={errors.cnic} /></div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Crop *</label>
                  <select name="cropId" value={form.cropId} onChange={handleChange} className={`form-select ${errors.cropId ? "is-invalid" : ""}`}>
                    <option value="">-- Select Crop --</option>
                    {crops.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {errors.cropId && <small className="text-danger">{errors.cropId}</small>}
                </div>
                <div className="col-md-3"><label className="form-label small fw-bold">Quantity *</label><input type="number" name="quantity" value={form.quantity} onChange={handleChange} className={`form-control ${errors.quantity ? "is-invalid" : ""}`} />{errors.quantity && <small className="text-danger">{errors.quantity}</small>}</div>
                <div className="col-md-3"><label className="form-label small fw-bold">Date *</label><input type="date" name="date" value={form.date} onChange={handleChange} className={`form-control ${errors.date ? "is-invalid" : ""}`} />{errors.date && <small className="text-danger">{errors.date}</small>}</div>
                <div className="col-12 mt-4"><ImageUpload preview={preview} onChange={handleImage} onRemove={handleRemoveImage} error={errors.image} /></div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light px-4" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-premium px-4">{editing ? "Update" : "Save Buyer"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}