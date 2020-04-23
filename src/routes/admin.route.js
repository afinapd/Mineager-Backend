const router = require("express").Router();

const Department = require("../models/department.model");
const BloodType = require("../models/btype.model");
const Gender = require("../models/gender.model");
const Attendance = require("../models/attendance.model");

const AdminService = require("../services/admin.service");
const adminService = new AdminService(
  Department,
  Gender,
  BloodType,
  Attendance
);

const { getAllOf } = require("../controllers/admin.controller");
const tokenValidation = require("../middlewares/token.validation");

router.use(tokenValidation);
router.get("/:type", (req, res, next) =>
  getAllOf(req, res, next, adminService)
);

module.exports = router;
