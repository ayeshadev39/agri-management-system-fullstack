const Inventory = require("../models/Inventory");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Inventory, "Inventory");