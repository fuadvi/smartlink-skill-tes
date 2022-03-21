const express = require("express");
const router = express.Router();
const layananHandler = require("./handler/Layanan");

router.post("/", layananHandler.layanan);

module.exports = router;
