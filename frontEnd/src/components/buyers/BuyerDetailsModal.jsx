import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatters";

export default function BuyerDetailsModal({ buyer, onClose }) {
  const crops = useSelector((state) => state.crops.crops) || [];
  if (!buyer) return null;

  const cropName = crops.find((c) => c.id === buyer.cropId)?.name || "-";

  const handlePrint = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head><title>Buyer - ${buyer.name}</title></head>
        <body style="font-family: Arial; padding: 40px;">
          <h1>Buyer Details</h1><hr/>
          <p><strong>Name:</strong> ${buyer.name}</p>
          <p><strong>CNIC:</strong> ${buyer.cnic}</p>
          <p><strong>Crop:</strong> ${cropName}</p>
          <p><strong>Quantity:</strong> ${buyer.quantity}</p>
          <p><strong>Date:</strong> ${formatDate(buyer.date)}</p>
          ${buyer.imageBase64 ? `<p><strong>Photo:</strong></p><img src="${buyer.imageBase64}" width="200" />` : ""}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return createPortal(
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-card border-0">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Buyer Details</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body text-center p-4">
            {buyer.imageBase64 ? (
              <img src={buyer.imageBase64} alt={buyer.name} className="rounded-4 border mb-3 shadow-sm" style={{ width: 160, height: 160, objectFit: "cover" }} />
            ) : (
              <div className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center mb-3 text-white" style={{ width: 120, height: 120 }}>
                <span className="material-icons" style={{ fontSize: 60 }}>person</span>
              </div>
            )}

            <h4 className="fw-bold mb-1">{buyer.name}</h4>
            <p className="text-muted mb-4">{buyer.cnic}</p>

            <div className="row g-2 text-start">
              <div className="col-6"><div className="p-3 rounded-3" style={{ background: "var(--bg-color)" }}><small className="text-muted">Crop</small><p className="fw-bold mb-0">{cropName}</p></div></div>
              <div className="col-6"><div className="p-3 rounded-3" style={{ background: "var(--bg-color)" }}><small className="text-muted">Quantity</small><p className="fw-bold mb-0">{buyer.quantity}</p></div></div>
              <div className="col-12"><div className="p-3 rounded-3" style={{ background: "var(--bg-color)" }}><small className="text-muted">Date</small><p className="fw-bold mb-0">{formatDate(buyer.date)}</p></div></div>
            </div>
          </div>

          <div className="modal-footer border-0 d-flex justify-content-between">
            <button className="btn btn-outline-success rounded-3 d-flex align-items-center gap-1" onClick={handlePrint}>
              <span className="material-icons" style={{ fontSize: 18 }}>print</span> Print
            </button>
            <button className="btn btn-premium px-4" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}