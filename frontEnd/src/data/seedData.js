// Crops
export const seedCrops = [
  { id: "c1", name: "Wheat", field: "Field A", plantingDate: "2026-10-01", cuttingDate: "2026-11-10", healthScore: 92, expectedQty: 1200, harvestedQty: 800, soldQty: 500 },
  { id: "c2", name: "Rice", field: "Field B", plantingDate: "2026-09-15", cuttingDate: "2026-10-20", healthScore: 78, expectedQty: 900, harvestedQty: 600, soldQty: 300 },
  { id: "c3", name: "Corn", field: "Field C", plantingDate: "2026-09-25", cuttingDate: "2026-10-18", healthScore: 55, expectedQty: 700, harvestedQty: 300, soldQty: 100 },
  { id: "c4", name: "Sugarcane", field: "Field D", plantingDate: "2026-08-10", cuttingDate: "2026-12-01", healthScore: 88, expectedQty: 2000, harvestedQty: 1000, soldQty: 400 },
  { id: "c5", name: "Cotton", field: "Field E", plantingDate: "2026-09-05", cuttingDate: "2026-11-25", healthScore: 42, expectedQty: 800, harvestedQty: 200, soldQty: 50 },
  { id: "c6", name: "Potato", field: "Field F", plantingDate: "2026-10-05", cuttingDate: "2027-01-15", healthScore: 90, expectedQty: 2500, harvestedQty: 500, soldQty: 100 },
];

// Orders
export const seedOrders = [
  { id: "o1", buyerName: "Ali Traders", cropId: "c1", quantity: 200, orderDate: "2026-10-10", status: "pending" },
  { id: "o2", buyerName: "Khan Agro", cropId: "c2", quantity: 150, orderDate: "2026-10-08", status: "delivered" },
  { id: "o3", buyerName: "Green Farms", cropId: "c6", quantity: 100, orderDate: "2026-10-12", status: "inTransit" },
];

// Buyers (Photo khali hai taake error na aaye)
export const seedBuyers = [
  { id: "b1", name: "Ali Khan", cnic: "35201-1234567-1", imageBase64: "", cropId: "c1", quantity: 200, date: "2026-10-10" },
  { id: "b2", name: "Sara Ahmed", cnic: "42101-7654321-2", imageBase64: "", cropId: "c6", quantity: 150, date: "2026-10-09" },
];

// Tasks
export const seedTasks = [
  { id: "t1", title: "Water Wheat Field", type: "Irrigation", cropId: "c1", dueDate: "2026-10-25", status: "pending" },
  { id: "t2", title: "Spray Fertilizer on Rice", type: "Fertilizer", cropId: "c2", dueDate: "2026-10-22", status: "pending" },
  { id: "t3", title: "Harvest Corn Field", type: "Labour", cropId: "c3", dueDate: "2026-10-19", status: "done" },
];

// Expenses
export const seedExpenses = [
  { id: "e1", cropId: "c1", category: "Seeds", amount: 5000, date: "2026-10-02", note: "Bought wheat seeds" },
  { id: "e2", cropId: "c2", category: "Labour", amount: 3000, date: "2026-10-05", note: "Labour for rice field" },
  { id: "e3", cropId: "c1", category: "Fertilizer", amount: 2000, date: "2026-10-08", note: "Urea fertilizer" },
  { id: "e4", cropId: "c3", category: "Fuel", amount: 1500, date: "2026-10-10", note: "Tractor fuel" },
];

// Inventory
export const seedInventory = [
  { id: "i1", item: "DAP Fertilizer", type: "Fertilizer", qty: 120, minQty: 50, unit: "bags" },
  { id: "i2", item: "Urea", type: "Fertilizer", qty: 30, minQty: 40, unit: "bags" },
  { id: "i3", item: "Wheat Seeds", type: "Seed", qty: 200, minQty: 100, unit: "kg" },
  { id: "i4", item: "Pesticide Spray", type: "Pesticide", qty: 15, minQty: 10, unit: "liters" },
];

// [NEW v2] Workers
export const seedWorkers = [
  { id: "w1", fullName: "Ramesh Kumar", cnic: "35202-1234567-3", phone: "03001234567", role: "Farm Hand", dailyWage: 1500, joinDate: "2026-01-10", status: "Active" },
  { id: "w2", fullName: "Sohail Ahmed", cnic: "35202-7654321-4", phone: "03217654321", role: "Driver", dailyWage: 2000, joinDate: "2026-02-15", status: "Active" },
  { id: "w3", fullName: "Imran Ali", cnic: "35202-1112223-5", phone: "03331112223", role: "Sprayer", dailyWage: 1200, joinDate: "2026-03-20", status: "Inactive" },
];

// [NEW v2] Attendance
export const seedAttendance = [
  { id: "a1", workerId: "w1", date: "2026-10-28", status: "Present", note: "" },
  { id: "a2", workerId: "w2", date: "2026-10-28", status: "Present", note: "" },
  { id: "a3", workerId: "w3", date: "2026-10-28", status: "Absent", note: "Sick" },
];

// [NEW v2] Equipment
export const seedEquipment = [
  { id: "eq1", name: "John Deere 5050", type: "Tractor", purchaseDate: "2024-05-10", status: "Active", lastServiceDate: "2026-09-15", serviceIntervalDays: 90, notes: "" },
  { id: "eq2", name: "Water Pump 5HP", type: "Water Pump", purchaseDate: "2025-01-20", status: "Under Repair", lastServiceDate: "2026-08-01", serviceIntervalDays: 60, notes: "Motor jam" },
  { id: "eq3", name: "Boom Sprayer", type: "Sprayer", purchaseDate: "2025-11-11", status: "Idle", lastServiceDate: "2026-10-01", serviceIntervalDays: 120, notes: "" },
];

// [NEW v2] Maintenance
export const seedMaintenance = [
  { id: "m1", equipmentId: "eq1", date: "2026-09-15", description: "Oil change & filter", cost: 5000, performedBy: "Auto Workshop" },
  { id: "m2", equipmentId: "eq2", date: "2026-08-01", description: "Impeller replaced", cost: 3500, performedBy: "Local Mechanic" },
];