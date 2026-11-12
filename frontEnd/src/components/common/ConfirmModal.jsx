export default function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                <span className="material-icons text-danger">warning</span>
                {title || "Confirm"}
              </h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0 text-muted">{message || "Are you sure you want to proceed?"}</p>
            </div>
            <div className="modal-footer border-0">
              <button className="btn btn-light rounded-3 px-4" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-danger rounded-3 px-4" onClick={onConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}