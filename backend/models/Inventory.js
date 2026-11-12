const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Inventory = sequelize.define("Inventory", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  item: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  qty: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  minQty: { type: DataTypes.DECIMAL(12, 2) },
  unit: { type: DataTypes.STRING },
});
module.exports = Inventory;