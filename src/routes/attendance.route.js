const express = require("express");
const router = express.Router();

const Attendance = require("../models/attendance.model");

const AttendanceService = require("../services/attendance.service");
const attendanceService = new AttendanceService(Attendance);
const tokenValidation = require("../middlewares/token.validation");

const {
  newAbsence,
  getAttendance,
} = require("../controllers/attendance.controller");

router.use(tokenValidation);
router.get("/attendance/:type", (req, res, next) =>
  getAttendance(req, res, next, attendanceService)
);
router.post("/:id/submit", (req, res) =>
  newAbsence(req, res, attendanceService)
);

module.exports = router;
