const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Attendance = sequelize.define("Attendance", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  workerId: { type: DataTypes.UUID, allowNull: false },
  date: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM("Present", "Absent"), defaultValue: "Present" },
});

module.exports = Attendance;