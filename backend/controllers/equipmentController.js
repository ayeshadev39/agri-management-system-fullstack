const Equipment = require("../models/Equipment");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Equipment, "Equipment");