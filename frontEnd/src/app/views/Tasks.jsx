import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDTASK, REMOVETASK, UPDATETASK } from "../../redux/actions/tasks";
import { formatDate } from "../../utils/formatters";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const crops = useSelector((state) => state.crops.crops);
  const role = useSelector((state) => state.user.role);

  const [form, setForm] = useState({ title: "", type: "Irrigation", cropId: "", dueDate: "" });
  const [deleteId, setDeleteId] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) return alert("Fill required fields");
    dispatch(ADDTASK(form, () => setForm({ title: "", type: "Irrigation", cropId: "", dueDate: "" })));
  };

  const handleToggle = (task) => {
    dispatch(UPDATETASK({ id: task.id, status: task.status === "done" ? "pending" : "done" }));
  };

  return (
    <div className="animate-fade-up pb-5">
      <div className="mb-4"><h3 className="fw-bold mb-1">Farm Task Scheduler</h3><p className="text-muted mb-0">Manage daily farm activities</p></div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">Add New Task</h5>
            <form onSubmit={handleAddTask}>
              <div className="mb-3"><label className="form-label small fw-bold">Task Title</label><input type="text" className="form-control" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Task Type</label>
                <select className="form-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="Irrigation">Irrigation</option><option value="Fertilizer">Fertilizer</option><option value="Spraying">Spraying</option><option value="Labour">Labour</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Link to Crop</label>
                <select className="form-select" value={form.cropId} onChange={e => setForm({...form, cropId: e.target.value})}>
                  <option value="">-- None --</option>
                  {crops.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="mb-4"><label className="form-label small fw-bold">Due Date</label><input type="date" className="form-control" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} /></div>
              <button type="submit" className="btn btn-premium w-100">Add Task</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-4">Task List</h5>
            {tasks.length === 0 ? <p className="text-muted">No tasks scheduled.</p> : (
              <div className="d-flex flex-column gap-3">
                {tasks.map(task => {
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
                  return (
                    <div key={task.id} className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ background: "var(--bg-color)", border: isOverdue ? "1px solid #ef4444" : "1px solid var(--border-color)" }}>
                      <div className="d-flex align-items-center gap-3">
                        <input type="checkbox" className="form-check-input mt-0" style={{ width: 20, height: 20, cursor: "pointer" }} checked={task.status === 'done'} onChange={() => handleToggle(task)} />
                        <div>
                          <h6 className={`mb-0 fw-bold ${task.status === 'done' ? 'text-decoration-line-through text-muted' : ''}`}>{task.title}</h6>
                          <small className="text-muted">{task.type} • {crops.find(c=>c.id===task.cropId)?.name || "No Crop"} • Due: {formatDate(task.dueDate)}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        {isOverdue && <span className="badge bg-danger">Overdue</span>}
                        {task.status === 'done' && <span className="badge bg-success">Done</span>}
                        {role === "Admin" && <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(task.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal show={!!deleteId} title="Delete Task" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVETASK(deleteId, () => setDeleteId(null))); }} />
    </div>
  );
}