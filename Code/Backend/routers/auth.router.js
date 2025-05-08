const express = require("express");
const multer = require("multer");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/auth.controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    // Optionally, rename the file to ensure uniqueness
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.fields([{ name: "profileImg", maxCount: 1 }]),
  register
);

router.post("/login", login);
router.post("/getprofile", getProfile);
router.post(
  "/updateprofile",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "profileImg", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
