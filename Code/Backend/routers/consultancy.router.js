const router = require("express").Router();
const multer = require("multer");

const fs = require("fs");
const path = require("path");
const {
  addworks,
  getnewWorks,
  updatework,
  counterOffer,
  acceptBidProposal,
  getBidAmounts,
} = require("../controllers/consultancy.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/consultancy/";

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

router.post("/addwork", upload.array("siteimages", 10), addworks);
router.get("/getNewWorks", getnewWorks);
router.post("/updatework", updatework);
router.post("/counter-offer", counterOffer);
router.post("/counter-bid", acceptBidProposal);
router.post("/getBidAmounts",getBidAmounts );

module.exports = router;
