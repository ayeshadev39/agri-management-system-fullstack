const sequelize = require("../config/db");
const User = require("./User");
const Crop = require("./Crop");
const Order = require("./Order");
const Buyer = require("./Buyer");
const Task = require("./Task");
const Expense = require("./Expense");
const Inventory = require("./Inventory");
const Worker = require("./Worker");
const Equipment = require("./Equipment");
const Attendance = require("./Attendance");

module.exports = { sequelize, User, Crop, Order, Buyer, Task, Expense, Inventory, Worker, Equipment, Attendance };