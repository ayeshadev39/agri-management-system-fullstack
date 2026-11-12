// redux/selectors/index.js

// Dashboard Stats
export const selectTotalHarvested = (state) => 
  state.crops.crops.reduce((sum, c) => sum + (c.harvestedQty || 0), 0);

export const selectTotalSold = (state) => 
  state.crops.crops.reduce((sum, c) => sum + (c.soldQty || 0), 0);

export const selectTotalExpenses = (state) => 
  state.expenses.expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

// Inventory Low Stock
export const selectLowStock = (state) => 
  state.inventory.items.filter(item => item.qty <= item.minQty);

// Workers (Aaj kitne present hain)
export const selectPresentToday = (state) => {
  const today = new Date().toISOString().split("T")[0];
  return state.attendance.records.filter(r => r.date === today && r.status === "Present").length;
};

// Equipment Due Services
export const selectServiceDue = (state) => {
  return state.equipment.equipment.filter(eq => {
    if (!eq.lastServiceDate || !eq.serviceIntervalDays) return false;
    const last = new Date(eq.lastServiceDate);
    const next = new Date(last.setDate(last.getDate() + Number(eq.serviceIntervalDays)));
    const today = new Date();
    const diffDays = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // 7 din ya kam bache hain
  });
};