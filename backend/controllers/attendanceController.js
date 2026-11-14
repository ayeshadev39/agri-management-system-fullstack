const Attendance = require("../models/Attendance");
const { ok, fail } = require("../utils/response");

exports.markAttendance = async (req, res) => {
  try {
    const { workerId, date, status } = req.body;
    // Check if already marked
    const existing = await Attendance.findOne({ where: { workerId, date } });
    if (existing) {
      await existing.update({ status });
      return ok(res, existing, "Attendance updated");
    }
    const attendance = await Attendance.create({ workerId, date, status });
    return ok(res, attendance, "Attendance marked", 201);
  } catch (err) {
    return fail(res, err.message);
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll();
    return ok(res, records);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};