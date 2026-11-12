import { useRef } from "react";

export default function ImageUpload({ preview, onChange, onRemove, error }) {
  const fileRef = useRef();

  return (
    <div>
      <label className="form-label small fw-bold">Buyer Photo (JPG/PNG, max 1MB) *</label>

      {preview ? (
        <div className="position-relative d-inline-block">
          <img
            src={preview}
            alt="Preview"
            className="rounded-3 border"
            style={{ width: 140, height: 140, objectFit: "cover" }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm rounded-circle position-absolute d-flex align-items-center justify-content-center"
            style={{ top: -8, right: -8, width: 28, height: 28, padding: 0 }}
            onClick={onRemove}
          >
            <span className="material-icons" style={{ fontSize: 16 }}>close</span>
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-3 p-4 text-center ${error ? "border-danger" : ""}`}
          style={{
            cursor: "pointer",
            border: `2px dashed ${error ? "#ef4444" : "var(--border-color)"}`,
            background: "var(--bg-color)",
          }}
          onClick={() => fileRef.current.click()}
        >
          <span className="material-icons text-success" style={{ fontSize: 40 }}>cloud_upload</span>
          <p className="mb-0 mt-2 fw-bold small">Click to upload photo</p>
          <small className="text-muted">JPG or PNG, max 1 MB</small>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={onChange}
        className="d-none"
      />

      {error && <small className="text-danger d-block mt-1">{error}</small>}
    </div>
  );
}