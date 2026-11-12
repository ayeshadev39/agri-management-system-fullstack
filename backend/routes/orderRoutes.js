const crudRoutes = require("../utils/crudRoutes");
const orderController = require("../controllers/orderController");
module.exports = crudRoutes(orderController);