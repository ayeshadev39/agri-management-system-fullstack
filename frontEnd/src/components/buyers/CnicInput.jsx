import { formatCnic } from "../../utils/formatters";

export default function CnicInput({ value, onChange, error }) {
  const handleChange = (e) => {
    const formatted = formatCnic(e.target.value);
    onChange(formatted);
  };

  return (
    <div>
      <label className="form-label small fw-bold">CNIC *</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="12345-1234567-1"
        maxLength={15}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error ? (
        <small className="text-danger">{error}</small>
      ) : (
        <small className="text-muted">Format: 12345-1234567-1</small>
      )}
    </div>
  );
}