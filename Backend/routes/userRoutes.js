const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getUsersForSidebar } = require("../controllers/users");

const app = express.Router();

app.use("/", authMiddleware, getUsersForSidebar)

module.exports = app;