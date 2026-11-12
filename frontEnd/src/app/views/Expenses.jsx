import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDEXPENSE, REMOVEEXPENSE } from "../../redux/actions/expenses";
import { formatDate, formatNumber } from "../../utils/formatters";
import ConfirmModal from "../../components/common/ConfirmModal";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const crops = useSelector((state) => state.crops.crops);
  const role = useSelector((state) => state.user.role);

  const [form, setForm] = useState({ cropId: "", category: "Seeds", amount: "", date: "", note: "" });
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.cropId || !form.amount) return alert("Fill required fields");
    dispatch(ADDEXPENSE({ ...form, amount: Number(form.amount) }, () => setForm({ cropId: "", category: "Seeds", amount: "", date: "", note: "" })));
  };

  const chartData = crops.map(crop => {
    const cropExpenses = expenses.filter(e => e.cropId === crop.id).reduce((sum, e) => sum + e.amount, 0);
    return { name: crop.name, Revenue: (crop.soldQty || 0) * 100, Expense: cropExpenses };
  });

  return (
    <div className="animate-fade-up pb-5">
      <div className="mb-4"><h3 className="fw-bold mb-1">Expenses & Profit/Loss</h3><p className="text-muted mb-0">Track your farm expenses</p></div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">Add Expense</h5>
            <form onSubmit={handleAdd}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Crop</label>
                <select className="form-select" value={form.cropId} onChange={e => setForm({...form, cropId: e.target.value})}>
                  <option value="">Select Crop</option>
                  {crops.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option value="Seeds">Seeds</option><option value="Fertilizer">Fertilizer</option><option value="Labour">Labour</option><option value="Fuel">Fuel</option><option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3"><label className="form-label small fw-bold">Amount</label><input type="number" className="form-control" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /></div>
              <div className="mb-3"><label className="form-label small fw-bold">Date</label><input type="date" className="form-control" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div className="mb-4"><label className="form-label small fw-bold">Note</label><input type="text" className="form-control" value={form.note} onChange={e => setForm({...form, note: e.target.value})} /></div>
              <button type="submit" className="btn btn-premium w-100">Add Expense</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold mb-3">Profit vs Expense</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" /><YAxis stroke="var(--text-muted)" />
                <Tooltip contentStyle={{ background: "var(--card-bg)" }} /><Legend />
                <Bar dataKey="Revenue" fill="#2e7d32" radius={[4, 4, 0, 0]} /><Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">Recent Expenses</h5>
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ color: "var(--text-main)" }}>
                <thead style={{ background: "var(--bg-color)" }}><tr><th>Crop</th><th>Category</th><th>Amount</th><th>Date</th><th className="text-end">Action</th></tr></thead>
                <tbody>
                  {expenses.map(ex => (
                    <tr key={ex.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td className="fw-bold">{crops.find(c => c.id === ex.cropId)?.name || "-"}</td>
                      <td>{ex.category}</td><td className="text-danger fw-bold">Rs. {formatNumber(ex.amount)}</td><td>{formatDate(ex.date)}</td>
                      <td className="text-end">{role === "Admin" && <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(ex.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal show={!!deleteId} title="Delete Expense" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVEEXPENSE(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}