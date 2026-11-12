const crudRoutes = require("../utils/crudRoutes");
const equipmentController = require("../controllers/equipmentController");
module.exports = crudRoutes(equipmentController);