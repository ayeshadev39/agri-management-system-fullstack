const crudRoutes = require("../utils/crudRoutes");
const workerController = require("../controllers/workerController");
module.exports = crudRoutes(workerController);