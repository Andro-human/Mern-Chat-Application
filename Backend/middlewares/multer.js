const multer = require("multer");

const multerUpload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }
});     // 5MB  limit

const singleAvatar = multerUpload.single("avatar");

module.exports = { singleAvatar };
