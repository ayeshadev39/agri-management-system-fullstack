const crudRoutes = require("../utils/crudRoutes");
const expenseController = require("../controllers/expenseController");
module.exports = crudRoutes(expenseController);