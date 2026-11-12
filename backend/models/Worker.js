const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Worker = sequelize.define("Worker", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  cnic: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  dailyWage: { type: DataTypes.DECIMAL(10, 2) },
  joinDate: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM("Active", "Inactive"), defaultValue: "Active" },
});

module.exports = Worker;