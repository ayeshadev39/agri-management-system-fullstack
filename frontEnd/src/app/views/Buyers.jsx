import { useState } from "react";
import BuyerTable from "../../components/buyers/BuyerTable";
import BuyerForm from "../../components/buyers/BuyerForm";

export default function Buyers() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleEdit = (buyer) => {
    setEditing(buyer);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  return (
    <div className="animate-fade-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Buyer Records</h3>
          <p className="text-muted mb-0">Manage buyer information with CNIC & photo</p>
        </div>
        <button className="btn btn-premium d-flex align-items-center gap-1" onClick={handleAdd}>
          <span className="material-icons" style={{ fontSize: 18 }}>person_add</span> Add Buyer
        </button>
      </div>

      <BuyerTable onEdit={handleEdit} />
      {showForm && <BuyerForm editing={editing} onClose={() => setShowForm(false)} />}
    </div>
  );
}