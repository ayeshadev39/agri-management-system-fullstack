const express = require("express");
const router = express.Router();
const { markAttendance, getAttendance } = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/", getAttendance);
router.post("/", markAttendance);

module.exports = router;