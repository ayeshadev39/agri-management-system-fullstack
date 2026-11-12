export default function SearchBar({ value, onChange, placeholder = "Search...", icon = "search" }) {
  return (
    <div className="position-relative">
      <span
        className="material-icons position-absolute text-muted"
        style={{ left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 20 }}
      >
        {icon}
      </span>
      <input
        type="text"
        className="form-control form-control-custom ps-5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}