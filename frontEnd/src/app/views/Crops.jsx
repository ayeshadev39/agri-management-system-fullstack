import { useState } from "react";
import { useSelector } from "react-redux";
import CropTable from "../../components/crops/CropTable";
import CropForm from "../../components/crops/CropForm";
import CropCards from "../../components/crops/CropCards";

export default function Crops() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // ✅ Backend data yahan se aa raha hai
  const crops = useSelector((state) => state.crops.crops) || [];
  const loading = useSelector((state) => state.crops.cropsLoading);

  const handleEdit = (crop) => { setEditing(crop); setShowForm(true); };
  const handleAdd = () => { setEditing(null); setShowForm(true); };
  const handleClose = () => { setShowForm(false); setEditing(null); };

  return (
    <div className="animate-fade-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Crop Management</h3>
          <p className="text-muted mb-0">Manage all crops, health, and harvest data</p>
        </div>
        <button className="btn btn-premium d-flex align-items-center gap-1" onClick={handleAdd}>
          <span className="material-icons" style={{ fontSize: 18 }}>add</span> Add Crop
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2 text-muted">Loading crops from database...</p>
        </div>
      ) : (
        <>
          <CropCards />
          <CropTable onEdit={handleEdit} onAdd={handleAdd} />
        </>
      )}

      {showForm && <CropForm editing={editing} onClose={handleClose} />}
    </div>
  );
}