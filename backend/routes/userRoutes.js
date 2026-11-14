const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware"); // ✅ Middleware Import

// Login sabke liye open hai
router.post("/login", login);

// ✅ Register sirf Admin kar sakta hai
router.post("/register", protect, authorize("admin"), register);

module.exports = router;