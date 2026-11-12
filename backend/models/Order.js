const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  buyerName: { type: DataTypes.STRING, allowNull: false },
  cropId: { type: DataTypes.UUID, allowNull: true }, // Relation baad me bana sakte hain
  quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  orderDate: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM("pending", "inTransit", "delivered"), defaultValue: "pending" },
});
module.exports = Order;