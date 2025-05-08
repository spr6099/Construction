const router = require("express").Router();
const {
  getConsultancys,
  addUserWorks,
  getworkStatus,
} = require("../controllers/client.controller");
const multer = require("multer");

const fs = require("fs");
const path = require("path");
const {
  acceptCounterProposal,
} = require("../controllers/consultancy.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/clients/";

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

router.get("/getconsultancys", getConsultancys);
router.post("/userWork", upload.array("siteimages", 10), addUserWorks);
router.post("/getworkStatus", getworkStatus);
router.post("/accept-counter", acceptCounterProposal);
module.exports = router;
