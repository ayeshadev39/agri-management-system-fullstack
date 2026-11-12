const crudRoutes = require("../utils/crudRoutes");
const inventoryController = require("../controllers/inventoryController");
module.exports = crudRoutes(inventoryController);
