const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, removeUser } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Login sabke liye
router.post("/login", login);

// ✅ Ye routes sirf Admin ke liye hain
router.post("/register", protect, authorize("admin"), register);
router.get("/", protect, authorize("admin"), getAllUsers);
router.delete("/:id", protect, authorize("admin"), removeUser);

module.exports = router;