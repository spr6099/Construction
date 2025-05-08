const express = require("express");
const {
  getuserdata,
  deleteUser,
  getAlluserdata,
  updateUser,
} = require("../controllers/admin.controller");
const router = express.Router();

router.post("/getalluserdata", getAlluserdata);
router.post("/deleteUser", deleteUser);
router.post("/updateUser", updateUser);

module.exports = router;
