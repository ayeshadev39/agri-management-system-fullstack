import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVEBUYER } from "../../redux/actions/buyers";
import SearchBar from "../common/SearchBar";
import ConfirmModal from "../common/ConfirmModal";
import BuyerDetailsModal from "./BuyerDetailsModal";
import { formatDate } from "../../utils/formatters";

export default function BuyerTable({ onEdit }) {
  const dispatch = useDispatch();
  const buyers = useSelector((state) => state.buyers.buyers) || []; // Safe check
  const crops = useSelector((state) => state.crops.crops) || [];
  const role = useSelector((state) => state.user.role);
  
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [viewBuyer, setViewBuyer] = useState(null); // ✅ Modal State

  const getCropName = (id) => crops.find(c => c.id === id)?.name || "-";

  return (
    <div className="glass-card p-4">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="fw-bold mb-0">Buyer Records</h5>
        <div style={{ width: 300 }}><SearchBar value={search} onChange={setSearch} placeholder="Search by name or CNIC..." /></div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" style={{ color: "var(--text-main)" }}>
          <thead style={{ background: "var(--bg-color)" }}>
            <tr><th>Photo</th><th>Name</th><th>CNIC</th><th>Crop</th><th>Qty</th><th>Date</th><th className="text-end">Actions</th></tr>
          </thead>
          <tbody>
            {buyers.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.cnic.includes(search)).map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td>
                  {b.imageBase64 ? (
                    <img src={b.imageBase64} alt={b.name} className="rounded-circle border" style={{ width: 40, height: 40, objectFit: "cover" }} />
                  ) : (
                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: 40, height: 40 }}>
                      <span className="material-icons" style={{ fontSize: 18 }}>person</span>
                    </div>
                  )}
                </td>
                <td className="fw-bold">{b.name}</td>
                <td>{b.cnic}</td>
                <td>{getCropName(b.cropId)}</td>
                <td className="fw-bold">{b.quantity}</td>
                <td>{formatDate(b.date)}</td>
                <td className="text-end">
                  {/* ✅ View Button Click */}
                  <button className="btn btn-sm btn-light text-info me-1" onClick={() => setViewBuyer(b)}>
                    <span className="material-icons" style={{ fontSize: 18 }}>visibility</span>
                  </button>
                  {role === "Admin" && (
                    <>
                      <button className="btn btn-sm btn-light text-primary me-1" onClick={() => onEdit(b)}><span className="material-icons" style={{ fontSize: 18 }}>edit</span></button>
                      <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteId(b.id)}><span className="material-icons" style={{ fontSize: 18 }}>delete</span></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal show={!!deleteId} title="Delete Buyer" message="Are you sure?" onCancel={() => setDeleteId(null)} onConfirm={() => { dispatch(REMOVEBUYER(deleteId, () => setDeleteId(null))); }} />
      
      {/* ✅ Modal Render */}
      {viewBuyer && <BuyerDetailsModal buyer={viewBuyer} onClose={() => setViewBuyer(null)} />}
    </div>
  );
}