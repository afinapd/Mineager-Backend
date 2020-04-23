const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const UserService = require("../services/user.service");
const userService = new UserService(User);

const tokenValidation = require("../middlewares/token.validation");

const {
  getAll,
  getById,
  createNew,
  update,
  removeUser,
} = require("../controllers/user.controller");

router.use(tokenValidation);
router.get("/", (req, res) => getAll(req, res, userService));
router.get("/:id/:type", (req, res) => getById(req, res, userService));
router.post("/new", (req, res) => createNew(req, res, userService));
router.put("/update", (req, res) => update(req, res, userService));
router.delete('/remove', (req, res) => removeUser(req, res, userService));

module.exports = router;
