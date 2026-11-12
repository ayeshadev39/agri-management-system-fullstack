const Buyer = require("../models/Buyer");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Buyer, "Buyer");