import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Footer from "./components/common/Footer";
import Login from "./app/views/Login";
import Signup from "./app/views/Signup";
import Dashboard from "./app/views/Dashboard";
import Crops from "./app/views/Crops";
import HarvestOrders from "./app/views/HarvestOrders";
import Buyers from "./app/views/Buyers";
import Tasks from "./app/views/Tasks";
import Expenses from "./app/views/Expenses";
import Inventory from "./app/views/Inventory";
import Reports from "./app/views/Reports";
import NotFound from "./app/views/NotFound";
import Workers from "./app/views/Workers";
import Equipment from "./app/views/Equipment";

// Actions import karein
import { GETSESSION } from "./redux/actions/user";
import { GETCROPS } from "./redux/actions/crops";
import { GETORDERS } from "./redux/actions/orders";
import { GETBUYERS } from "./redux/actions/buyers";
import { GETTASKS } from "./redux/actions/tasks";
import { GETEXPENSES } from "./redux/actions/expenses";
import { GETINVENTORY } from "./redux/actions/inventory";
import { GETWORKERS } from "./redux/actions/workers";       // ✅ Workers
import { GETEQUIPMENT } from "./redux/actions/equipment";   // ✅ Equipment

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  
  const { isAuthenticated, role } = useSelector((state) => state.user);
  
  useEffect(() => {
    // ✅ Session check karein, agar login hai to sab data fetch karein
    dispatch(GETSESSION(() => {
      dispatch(GETCROPS());
      dispatch(GETORDERS());
      dispatch(GETBUYERS());
      dispatch(GETTASKS());
      dispatch(GETEXPENSES());
      dispatch(GETINVENTORY());
      dispatch(GETWORKERS());       // ✅ Workers Data
      dispatch(GETEQUIPMENT());     // ✅ Equipment Data
    }));
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="d-flex min-vh-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} role={role} />
      <div className="main-content flex-grow-1 d-flex flex-column">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/harvest" element={<HarvestOrders />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}