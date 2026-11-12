const Order = require("../models/Order");
const crudFactory = require("../utils/crudFactory");
module.exports = crudFactory(Order, "Order");