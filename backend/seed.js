const { sequelize, User, Crop, Order, Buyer, Task, Expense, Inventory, Worker, Equipment } = require("./models/associations");

(async () => {
  try {
    console.log("Clearing old data...");
    await Crop.destroy({ where: {}, truncate: true, cascade: true });
    await Order.destroy({ where: {}, truncate: true, cascade: true });
    await Buyer.destroy({ where: {}, truncate: true, cascade: true });
    await Task.destroy({ where: {}, truncate: true, cascade: true });
    await Expense.destroy({ where: {}, truncate: true, cascade: true });
    await Inventory.destroy({ where: {}, truncate: true, cascade: true });
    await Worker.destroy({ where: {}, truncate: true, cascade: true });
    await Equipment.destroy({ where: {}, truncate: true, cascade: true });

    console.log("Adding fresh data...");

    // 1. Seed Crops (6 Crops)
    const crops = await Crop.bulkCreate([
      { name: "Wheat", field: "Field A", plantingDate: "2026-10-01", cuttingDate: "2026-11-10", healthScore: 92, expectedQty: 1200, harvestedQty: 800, soldQty: 500 },
      { name: "Rice", field: "Field B", plantingDate: "2026-09-15", cuttingDate: "2026-10-20", healthScore: 78, expectedQty: 900, harvestedQty: 600, soldQty: 300 },
      { name: "Corn", field: "Field C", plantingDate: "2026-09-25", cuttingDate: "2026-10-18", healthScore: 55, expectedQty: 700, harvestedQty: 300, soldQty: 100 },
      { name: "Sugarcane", field: "Field D", plantingDate: "2026-08-10", cuttingDate: "2026-12-01", healthScore: 88, expectedQty: 2000, harvestedQty: 1000, soldQty: 400 },
      { name: "Cotton", field: "Field E", plantingDate: "2026-09-05", cuttingDate: "2026-11-25", healthScore: 42, expectedQty: 800, harvestedQty: 200, soldQty: 50 },
      { name: "Potato", field: "Field F", plantingDate: "2026-10-05", cuttingDate: "2027-01-15", healthScore: 90, expectedQty: 2500, harvestedQty: 500, soldQty: 100 },
    ]);

    // 2. Seed Orders
    await Order.bulkCreate([
      { buyerName: "Ali Traders", cropId: crops[0].id, quantity: 200, orderDate: "2026-10-10", status: "pending" },
      { buyerName: "Khan Agro", cropId: crops[1].id, quantity: 150, orderDate: "2026-10-08", status: "delivered" },
      { buyerName: "Green Farms", cropId: crops[5].id, quantity: 100, orderDate: "2026-10-12", status: "inTransit" },
    ]);

    // 3. Seed Buyers
    await Buyer.bulkCreate([
      { name: "Ali Khan", cnic: "35201-1234567-1", cropId: crops[0].id, quantity: 200, date: "2026-10-10", imageBase64: "" },
      { name: "Sara Ahmed", cnic: "42101-7654321-2", cropId: crops[5].id, quantity: 150, date: "2026-10-09", imageBase64: "" },
    ]);

    // 4. Seed Tasks
    await Task.bulkCreate([
      { title: "Water Wheat Field", type: "Irrigation", cropId: crops[0].id, dueDate: "2026-10-25", status: "pending" },
      { title: "Spray Fertilizer on Rice", type: "Fertilizer", cropId: crops[1].id, dueDate: "2026-10-22", status: "pending" },
      { title: "Harvest Corn Field", type: "Labour", cropId: crops[2].id, dueDate: "2026-10-19", status: "done" },
    ]);

    // 5. Seed Expenses
    await Expense.bulkCreate([
      { cropId: crops[0].id, category: "Seeds", amount: 5000, date: "2026-10-02", note: "Bought wheat seeds" },
      { cropId: crops[1].id, category: "Labour", amount: 3000, date: "2026-10-05", note: "Labour for rice field" },
      { cropId: crops[2].id, category: "Fuel", amount: 1500, date: "2026-10-10", note: "Tractor fuel" },
    ]);

    // 6. Seed Inventory
    await Inventory.bulkCreate([
      { item: "DAP Fertilizer", type: "Fertilizer", qty: 120, minQty: 50, unit: "bags" },
      { item: "Urea", type: "Fertilizer", qty: 30, minQty: 40, unit: "bags" },
      { item: "Wheat Seeds", type: "Seed", qty: 200, minQty: 100, unit: "kg" },
      { item: "Pesticide Spray", type: "Pesticide", qty: 15, minQty: 10, unit: "liters" },
    ]);

    // 7. Seed Workers
    await Worker.bulkCreate([
      { fullName: "Ramesh Kumar", cnic: "35202-1234567-3", phone: "03001234567", role: "Farm Hand", dailyWage: 1500, joinDate: "2026-01-10", status: "Active" },
      { fullName: "Sohail Ahmed", cnic: "35202-7654321-4", phone: "03217654321", role: "Driver", dailyWage: 2000, joinDate: "2026-02-15", status: "Active" },
      { fullName: "Imran Ali", cnic: "35202-1112223-5", phone: "03331112223", role: "Sprayer", dailyWage: 1200, joinDate: "2026-03-20", status: "Inactive" },
    ]);

    // 8. Seed Equipment
    await Equipment.bulkCreate([
      { name: "John Deere 5050", type: "Tractor", purchaseDate: "2024-05-10", status: "Active", lastServiceDate: "2026-09-15", serviceIntervalDays: 90, notes: "" },
      { name: "Water Pump 5HP", type: "Water Pump", purchaseDate: "2025-01-20", status: "Under Repair", lastServiceDate: "2026-08-01", serviceIntervalDays: 60, notes: "Motor jam" },
      { name: "Boom Sprayer", type: "Sprayer", purchaseDate: "2025-11-11", status: "Idle", lastServiceDate: "2026-10-01", serviceIntervalDays: 120, notes: "" },
    ]);

    console.log("✅ All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
})();