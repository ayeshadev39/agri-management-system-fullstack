import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDWORKER, REMOVEWORKER, UPDATEWORKER, GETWORKERS } from "../../../redux/actions/workers";
import { MARKATTENDANCE, GETATTENDANCE } from "../../../redux/actions/attendance";
import ConfirmModal from "../../../components/common/ConfirmModal";

export default function Workers() {
  const dispatch = useDispatch();
  const workers = useSelector((state) => state.workers.workers) || [];
  const attendance = useSelector((state) => state.attendance.records) || [];
  const role = useSelector((state) => state.user.role);

  const [form, setForm] = useState({ fullName: "", cnic: "", phone: "", role: "Farm Hand", dailyWage: "", joinDate: "", status: "Active" });
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [attDate, setAttDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    dispatch(GETWORKERS());
    dispatch(GETATTENDANCE());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.cnic || !form.dailyWage) return alert("Fill required fields");
    const payload = { ...form, dailyWage: Number(form.dailyWage) };

    if (editing) {
      dispatch(UPDATEWORKER({ ...payload, id: editing.id }, () => { setEditing(null); setForm({ fullName: "", cnic: "", phone: "", role: "Farm Hand", dailyWage: "", joinDate: "", status: "Active" }); dispatch(GETWORKERS()); }));
    } else {
      dispatch(ADDWORKER(payload, () => setForm({ fullName: "", cnic: "", phone: "", role: "Farm Hand", dailyWage: "", joinDate: "", status: "Active" })));
    }
  };

  const handleMarkAttendance = (workerId, status) => {
    dispatch(MARKATTENDANCE({ workerId, date: attDate, status }, () => {
      dispatch(GETATTENDANCE());
    }));
  };

  return (
    <div className="animate-fade-up pb-5">
      <div className="mb-4"><h3 className="fw-bold mb-1">Workers & Labour</h3><p className="text-muted mb-0">Manage workers and daily attendance</p></div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">{editing ? "Edit Worker" : "Add Worker"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><label className="form-label small fw-bold">Full Name *</label><input type="text" className="form-control" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} /></div>
              <div className="mb-3"><label className="form-label small fw-bold">CNIC *</label><input type="text" className="form-control" placeholder="12345-1234567-1" value={form.cnic} onChange={e => setForm({...form, cnic: e.target.value})} /></div>
              <div className="mb-3"><label className="form-label small fw-bold">Phone</label><input type="text" className="form-control" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              <div className="row g-2 mb-3">
                <div className="col-6"><label className="form-label small fw-bold">Role</label><select className="form-select" value={form.role} onChange={e => setForm({...form, role: e.target.value})}><option value="Farm Hand">Farm Hand</option><option value="Driver">Driver</option><option value="Supervisor">Supervisor</option></select></div>
                <div className="col-6"><label className="form-label small fw-bold">Wage *</label><input type="number" className="form-control" value={form.dailyWage} onChange={e => setForm({...form, dailyWage: e.target.value})} /></div>
              </div>
              <button type="submit" className="btn btn-premium w-100">{editing ? "Update" : "Add Worker"}</button>
              {editing && <button type="button" className="btn btn-light w-100 mt-2" onClick={() => { setEditing(null); setForm({ fullName: "", cnic: "", phone: "", role: "Farm Hand", dailyWage: "", joinDate: "", status: "Active" }); }}>Cancel</button>}
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Worker List & Attendance</h5>
              <div className="d-flex align-items-center gap-2">
                <label className="small fw-bold">Date:</label>
                <input type="date" className="form-control form-control-sm" value={attDate} onChange={e => setAttDate(e.target.value)} style={{ width: 150 }} />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ color: "var(--text-main)" }}>
                <thead style={{ background: "var(--bg-color)" }}>
                  <tr><th>Name</th><th>Role</th><th>Wage</th><th>Attendance</th><th className="text-end">Actions</th></tr>
                </thead>
                <tbody>
                  {workers.map(w => {
                    const isPresent = attendance.find(a => a.workerId === w.id && a.date === attDate && a.status === "Present");
                    const isAbsent = attendance.find(a => a.workerId === w.id && a.date === attDate && a.status === "Absent");
                    return (
                      <tr key={w.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td className="fw-bold">{w.fullName}<br/><small className="text-muted fw-normal">{w.cnic}</small></td>
                        <td>{w.role}</td>
                        <td className="fw-bold text-success">Rs. {w.dailyWage}</td>
                        <td>
                          {isPresent ? <span className="badge bg-success">Present</span> : isAbsent ? <span className="badge bg-danger">Absent</span> : (
                            <div className="d-flex gap-1">
                              <button className="btn btn-sm btn-outline-success py-0" onClick={() => handleMarkAttendance(w.id, "Present")}>P</button>
                              <button className="btn btn-sm btn-outline-danger py-0" onClick={() => handleMarkAttendance(w.id, "Absent")}>A</button>
                            </div>
                          )}
                        </td>
                        <td className="text-end">
                          {role === "Admin" && (
                            <>
                              <button className="btn btn-sm btn-light text-primary me-1" onClick={() => { setEditing(w); setForm(w); }}><span className="material-icons" style={{ fontSize: 18 }}>edit</span></button>
                              <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(w.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>
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
      <ConfirmModal show={!!deleteId} title="Delete Worker" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVEWORKER(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}