const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Buyer = sequelize.define("Buyer", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  cnic: { type: DataTypes.STRING, allowNull: false, unique: true },
  imageBase64: { type: DataTypes.TEXT }, // Photo
  cropId: { type: DataTypes.UUID, allowNull: true },
  quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  date: { type: DataTypes.DATEONLY },
});
module.exports = Buyer;