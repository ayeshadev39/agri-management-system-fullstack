import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../../redux/api/user";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const role = useSelector((state) => state.user.role);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.data.succeeded) setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId);
      setDeleteId(null);
      loadUsers(); // List refresh karein
    } catch (err) {
      alert("Error deleting user");
    }
  };

  if (role !== "Admin" && role !== "admin") {
    return <div className="p-5 text-center text-danger"><h3>Access Denied. Only Admin can view this page.</h3></div>;
  }

  return (
    <div className="animate-fade-up pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Users Management</h3>
          <p className="text-muted mb-0">Manage system administrators and managers</p>
        </div>
        <Link to="/signup" className="btn btn-premium d-flex align-items-center gap-1">
          <span className="material-icons" style={{ fontSize: 18 }}>person_add</span> Add New User
        </Link>
      </div>

      <div className="glass-card p-4">
        {loading ? (
          <p className="text-center py-4">Loading users...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ color: "var(--text-main)" }}>
              <thead style={{ background: "var(--bg-color)" }}>
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td className="fw-bold py-3">{u.fullName}</td>
                    <td className="py-3">{u.username}</td>
                    <td className="text-muted py-3">{u.email}</td>
                    <td className="py-3">
                      <span className={`badge ${u.role === "admin" ? "bg-success" : "bg-primary"}`}>
                        {u.role === "admin" ? "Admin" : "Manager"}
                      </span>
                    </td>
                    <td className="text-end py-3">
                      <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(u.id)} title="Delete User">
                        <span className="material-icons" style={{ fontSize: 18 }}>delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        show={!!deleteId}
        title="Delete User"
        message="Are you sure you want to delete this user? They will lose access to the system."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}