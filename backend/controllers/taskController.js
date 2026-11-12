const Task = require("../models/Task");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Task, "Task");