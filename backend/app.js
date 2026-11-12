const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./config/db");

// Routes Import
const userRoutes = require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const orderRoutes = require("./routes/orderRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const workerRoutes = require("./routes/workerRoutes");       // ✅ Workers Import
const equipmentRoutes = require("./routes/equipmentRoutes"); // ✅ Equipment Import

// Associations Import (Taake tables aur relations sahi banein)
require("./models/associations");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/workers", workerRoutes);       // ✅ Workers Route
app.use("/api/equipment", equipmentRoutes);  // ✅ Equipment Route

// Test Route
app.get("/api/health", (req, res) => {
  res.json({ succeeded: true, message: "API is running" });
});

const PORT = process.env.PORT_NAME || 5000;

// Database Sync & Server Start
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced!");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error("Failed to sync database:", err);
});