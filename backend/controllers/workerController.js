const Worker = require("../models/Worker");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Worker, "Worker");