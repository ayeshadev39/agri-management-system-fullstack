const crudRoutes = require("../utils/crudRoutes");
const taskController = require("../controllers/taskController");
module.exports = crudRoutes(taskController);