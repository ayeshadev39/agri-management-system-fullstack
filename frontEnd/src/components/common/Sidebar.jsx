import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose, role }) {
  const links = [
    { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/crops", label: "Crops", icon: "grass" },
    { path: "/harvest", label: "Harvest & Orders", icon: "inventory" },
    { path: "/buyers", label: "Buyers", icon: "people" },
    { path: "/tasks", label: "Farm Tasks", icon: "task_alt" },
    { path: "/expenses", label: "Expenses", icon: "payments" },
    { path: "/inventory", label: "Inventory", icon: "inventory_2" },
    { path: "/workers", label: "Workers", icon: "engineering" },
    { path: "/equipment", label: "Equipment", icon: "agriculture" },
    { path: "/signup", label: "Sign Up", icon: "person_add" }, // ✅ Signup Link Add Kiya
  ];

  // Sirf Admin ko Reports dekhne ki ijazat hai
  if (role === "Admin") {
    links.push({ path: "/reports", label: "Reports & Logs", icon: "analytics" });
  }

  return (
    <>
      {isOpen && <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-3 d-lg-none" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? "open" : ""} p-3`}>
        <div className="d-flex align-items-center gap-2 px-3 mb-4 mt-2">
          <span className="material-icons text-success fs-1">agriculture</span>
          <h4 className="sidebar-title mb-0">AgriSys</h4>
        </div>

        <nav className="d-flex flex-column h-100">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <span className="material-icons">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}