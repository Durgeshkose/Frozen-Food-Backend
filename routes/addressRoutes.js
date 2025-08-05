// routes/addressRoutes.js
const express = require("express");
const { getUserAddresses, addAddress } = require("../controllers/addressController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/")
  .get(protect, getUserAddresses)
  .post(protect, addAddress);

module.exports = router;
