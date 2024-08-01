const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { searchUser } = require("../controllers/users");

const app = express.Router();

app.use("/search", authMiddleware, searchUser)

module.exports = app;