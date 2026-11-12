const Crop = require("../models/Crop");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Crop, "Crop");