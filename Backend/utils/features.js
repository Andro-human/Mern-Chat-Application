const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { v4: uuid } = require("uuid");
// const { userSocketIDs, getSockets } = require("../server.js");

const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res
    .status(statusCode)
    .cookie("Login-token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",  // prevent csrf attacks & cross-site request forgery attacks
      httpOnly: true, // prevent xss attacks & cross-site scripting attacks
      secure: true,
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};

const getBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

const uploadFilesToCloudinary = async (file) => {
  try {
    // const uploadedFiles = [];
    // for (let i = 0; i < files.length; i++) {
    // const file = files[i];
    const uploadedFile = await cloudinary.uploader.upload(getBase64(file), {
      resource_type: "auto",
      public_id: uuid(),
      folder: "Images",
    });
    // uploadedFiles.push({
    //   public_id: uploadedFile.public_id,
    //   url: uploadedFile.secure_url,
    // });
    // }
    return uploadedFile;
  } catch (error) {
    // console.error("Detailed error in uploading files to Cloudinary:", error);
    throw new Error("Error in uploading files to cloudinary", error);
  }
};

const emitEvent = (req, event, data) => {
  const io = req.app.get("io");
  // console.log(io);
  // console.log("userIdhow?: ", userSocketIDs);
  // const usersSocket = getSockets(users);
  // console.log("usersSocket: ", usersSocket);
  io.emit(event, data);
};

module.exports = { sendToken, uploadFilesToCloudinary, emitEvent };
