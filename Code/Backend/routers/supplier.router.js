const router = require("express").Router();

const {
  addProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/supplier.controller");

const multer = require("multer");

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/supplier/";

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
  "/addProduct",
  // upload.single("productimage"),
  upload.fields([{ name: "productimage", maxCount: 1 }]),

  addProducts
);
router.get("/getProduct", getProducts);
router.post("/updateProduct", upload.single("productimage"), updateProduct);
router.post("/deleteproducts", deleteProduct);

module.exports = router;
