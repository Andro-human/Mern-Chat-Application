const userModel = require("../models/userModel");
const {sendToken, uploadFilesToCloudinary, emitEvent} = require("../utils/features");
const bcrypt = require("bcryptjs");
// create a new user and save it to the database and save in cookie
const newUserController = async (req, res) => {
  try {
    const { name, username, password, bio } = req.body;

    const file = req.file; 

    if (!file) return res.status(400).json({ message: "Please upload Avatar" });
    
    const result = await uploadFilesToCloudinary(file);
    
    const avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    // console.log(name, username, password, bio);

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      username,
      password: hashedPassword,
      bio,
      avatar,
    });

    sendToken(res, user, 201, "User created successfully");
    emitEvent(req, "refetchChats");

    // res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username }).select("+password"); // password was set to select false in userModel.js, so we need to select it explicitly
    // console.log("HELLo");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    sendToken(res, user, 201, `Welcome back, ${user.name}`);
    emitEvent(req, "refetchChats");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.userId });
    return res.status(200).json({
      success: true,
      message: "User fectched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getUser API",
      error,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    res.cookie("Login-token", "none", {
      // setting the cookie to none and expires to 0
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Logout API",
      error,
    });
  }
};

module.exports = {
  newUserController,
  loginController,
  getUserController,
  logoutController,
};
