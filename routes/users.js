const express = require("express");
const router = express.Router();
const userHandler = require("./handler/Users");

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);

module.exports = router;
