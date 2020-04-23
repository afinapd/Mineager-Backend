const router = require("express").Router();

const Gender = require("../models/gender.model");
const BloodType = require("../models/btype.model");
const Department = require("../models/department.model");
const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");
const tokenValidation = require("../middlewares/token.validation");

const DumpService = require("../services/dump.service");
const dumpService = new DumpService(
  User,
  Gender,
  Department,
  Attendance,
  BloodType
);

const {
  dumpAll,
  getUpdateDelta,
  synch,
} = require("../controllers/dump.controller");

router.use(tokenValidation);
router.get("/all", (req, res) => dumpAll(req, res, dumpService));
router.put("/update", (req, res) => getUpdateDelta(req, res, dumpService));
router.post("/sync", (req, res) => synch(req, res, dumpService));

module.exports = router;
