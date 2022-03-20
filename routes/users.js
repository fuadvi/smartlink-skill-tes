const express = require("express");
const router = express.Router();
const userHandler = require("./handler/Users");

router.post("/", userHandler.register);

module.exports = router;
