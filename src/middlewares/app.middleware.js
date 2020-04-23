const express = require("express");
const router = express.Router();
const dbAssociation = require("../models/index");

router.use("/images", express.static("images"));
router.use(express.json());
router.use((req, res, next) => {
  dbAssociation();
  next();
});

module.exports = router;
