const {
  addSkills,
  getSkills,
  updateSkills,
  getOfferLetters,
  updateOfferLetter,
  getWorkers,
} = require("../controllers/labour.controller");

const router = require("express").Router();

const multer = require("multer");

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/labour/";

    // Check if folder exists, if not create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add_skills",
  upload.fields([{ name: "exp_certificate", maxCount: 1 }]),
  addSkills
);
router.post("/getskills", getSkills);

router.post(
  "/update_skills",
  upload.fields([{ name: "exp_certificate", maxCount: 1 }]),
  updateSkills
);

router.post("/getOfferLetters", getOfferLetters);
router.post("/offerLetterUpdate", updateOfferLetter);
router.post("/getWorkers", getWorkers);
module.exports = router;
