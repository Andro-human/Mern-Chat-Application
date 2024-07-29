const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

const app = express.Router();

app.post("/send/:id", authMiddleware ,sendMessage);
app.get("/get/:id", authMiddleware, getMessages);


module.exports = app;
