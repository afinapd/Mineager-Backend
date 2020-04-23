const router = require("express").Router();

const User = require("../models/user.model");

const AuthService = require("../services/auth.service");
const authService = new AuthService(User);

const { authenticate } = require("../controllers/auth.controller");

router.post("/", (req, res) => authenticate(req, res, authService));

module.exports = router;
