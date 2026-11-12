const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Crop = sequelize.define("Crop", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  field: { type: DataTypes.STRING, allowNull: false },
  plantingDate: { type: DataTypes.DATEONLY },
  cuttingDate: { type: DataTypes.DATEONLY },
  healthScore: { type: DataTypes.INTEGER, defaultValue: 100 },
  expectedQty: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  harvestedQty: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  soldQty: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  status: {
    type: DataTypes.ENUM("Healthy", "Needs Attention", "Critical"),
    defaultValue: "Healthy",
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true, // Filhal true rakhein taake error na aaye
  },
});

module.exports = Crop;