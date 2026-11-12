const Expense = require("../models/Expense");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Expense, "Expense");