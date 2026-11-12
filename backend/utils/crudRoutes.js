const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");

const crudRoutes = (controller) => {
  const router = express.Router();

  router.use(protect); // ✅ Sab routes protected hain

  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", controller.create);
  
  // ✅ Sirf Admin hi Update aur Delete kar sakta hai
  router.put("/:id", authorize("admin"), controller.update);
  router.delete("/:id", authorize("admin"), controller.remove);

  return router;
};

module.exports = crudRoutes;