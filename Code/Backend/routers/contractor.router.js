const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  getnewTendors,
  addBidAmount,
  getBidAmounts,
  getLabours,
  getAllWorks,
  getOneWork,
  addToCart,
  getCart,
  updateCart,
  addOfferLetter,
  getProducts,
  updateworkstatus,
} = require("../controllers/contractor.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/contractor/";

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

router.get("/getnewTendors", getnewTendors);
router.post("/counter-bid", addBidAmount);
router.post("/getBidAmounts", getBidAmounts);
router.get("/getLabours", getLabours);
router.get("/getallworks", getAllWorks);
router.post("/getonework", getOneWork);
router.post("/addtocart", addToCart);
router.post("/getCart", getCart);
router.post("/updateCart", updateCart);
router.post("/sendOfferLetter", addOfferLetter);
router.post("/getProducts", getProducts);
router.post(
  "/updateworkstatus",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateworkstatus
);
// -----
module.exports = router;
