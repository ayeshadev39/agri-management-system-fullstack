const crudRoutes = require("../utils/crudRoutes");
const buyerController = require("../controllers/buyerController");
module.exports = crudRoutes(buyerController);