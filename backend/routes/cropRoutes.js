const crudRoutes = require("../utils/crudRoutes");
const cropController = require("../controllers/cropController");
module.exports = crudRoutes(cropController);