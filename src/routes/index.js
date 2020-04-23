const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const attendanceRoute = require("./attendance.route");
const authRoute = require("./auth.route");
const imageRoute = require("./images.route");
const dumpRoute = require("./dump.route");
const logRoute = require("./log.route");
const noRoute = require("./no.route");
const adminRoute = require("./admin.route");

router.use(logRoute);
router.use("/auth", authRoute);
router.use("/adm", adminRoute);
router.use("/i", imageRoute);
router.use("/d", dumpRoute);
router.use("/u", userRoute);
router.use("/a", attendanceRoute);
router.use(noRoute);

module.exports = router;