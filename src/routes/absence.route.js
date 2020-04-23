const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const BloodType = require("../models/btype.model");
const Department = require("../models/department.model");
const Absence = require("../models/absence.model");
const Gender = require("../models/gender.model");

const UserService = require("../services/user.service");
const userService = new UserService(
  User,
  BloodType,
  Department,
  Absence,
  Gender
);
const tokenValidation = require("../middlewares/token.validation");

const { getByDate, newAbsence } = require("../controllers/user.controller");

router.use(tokenValidation);
router.get("/:date", (req, res) => {
  getByDate(req, res, userService);
});
router.post("/:id/submit", (req, res) => {
  newAbsence(req, res, userService);
});

module.exports = router;
