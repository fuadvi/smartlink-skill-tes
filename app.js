require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const verifyToken = require("./middleware/verifyToken");

const usersRouter = require("./routes/users");
const layananRouter = require("./routes/layanan");

const app = express();

// SWEGGER
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./apidocs.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/layanan", verifyToken, layananRouter);

module.exports = app;
