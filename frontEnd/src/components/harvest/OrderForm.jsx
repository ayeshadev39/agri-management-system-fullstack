import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import Toast from "../common/Toast";
import { appConfig } from "../../config/appConfig";

const empty = { buyerName: "", cropId: "", quantity: "", orderDate: "", status: "pending" };

export default function OrderForm({ editing, onClose }) {
  const { crops, addOrder, updateOrder } = useApp();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ ...empty, orderDate: new Date().toISOString().split("T")[0] });
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const err = {};
    if (!form.buyerName.trim()) err.buyerName = "Buyer name is required";
    if (!form.cropId) err.cropId = "Select a crop";
    if (!form.quantity || form.quantity <= 0) err.quantity = "Enter valid quantity";
    if (!form.orderDate) err.orderDate = "Order date required";

    if (form.cropId) {
      const crop = crops.find((c) => c.id === form.cropId);
      if (crop) {
        const stock = (crop.harvestedQty || 0) - (crop.soldQty || 0);
        if (Number(form.quantity) > stock) {
          err.quantity = `Only ${stock} units available`;
        }
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      quantity: Number(form.quantity),
    };

    if (editing) {
      updateOrder(editing.id, payload);
      setToast({ show: true, message: "Order updated", type: "success" });
    } else {
      addOrder(payload);
      setToast({ show: true, message: "Order created", type: "success" });
    }

    setTimeout(() => onClose(), 1000);
  };

  return (
    <>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                <span className="material-icons text-success">receipt_long</span>
                {editing ? "Edit Order" : "New Order"}
              </h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Buyer Name *</label>
                  <input
                    name="buyerName"
                    value={form.buyerName}
                    onChange={handleChange}
                    className={`form-control form-control-custom ${errors.buyerName ? "is-invalid" : ""}`}
                    placeholder="e.g. Ali Traders"
                  />
                  {errors.buyerName && <small className="text-danger">{errors.buyerName}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small">Crop *</label>
                  <select
                    name="cropId"
                    value={form.cropId}
                    onChange={handleChange}
                    className={`form-control form-control-custom ${errors.cropId ? "is-invalid" : ""}`}
                  >
                    <option value="">-- Select Crop --</option>
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {(c.harvestedQty || 0) - (c.soldQty || 0)} available
                      </option>
                    ))}
                  </select>
                  {errors.cropId && <small className="text-danger">{errors.cropId}</small>}
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold small">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.quantity ? "is-invalid" : ""}`}
                      placeholder="e.g. 100"
                    />
                    {errors.quantity && <small className="text-danger">{errors.quantity}</small>}
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold small">Order Date *</label>
                    <input
                      type="date"
                      name="orderDate"
                      value={form.orderDate}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.orderDate ? "is-invalid" : ""}`}
                    />
                    {errors.orderDate && <small className="text-danger">{errors.orderDate}</small>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-control form-control-custom"
                  >
                    {Object.entries(appConfig.orderStatuses).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="btn btn-light rounded-3 px-4" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom px-4">
                    {editing ? "Update" : "Create Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}