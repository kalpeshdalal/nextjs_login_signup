const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const httpStatus = require("http-status");

const app = express();
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.options("*", cors());
app.use(mongoSanitize());
module.exports = app;
