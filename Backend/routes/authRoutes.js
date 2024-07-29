const express = require('express');
const { loginController, getUserController, logoutController, newUserController } = require('../controllers/authController');
const { singleAvatar } = require('../middlewares/multer');
const authMiddleware = require('../middlewares/authMiddleware');

const app = express.Router();

app.post("/new", singleAvatar, newUserController)
app.post("/login", loginController)

// This is a protected route that requires a valid token to access
app.get("/profile", authMiddleware, getUserController)      
app.post("/logout", authMiddleware, logoutController)

module.exports = app;