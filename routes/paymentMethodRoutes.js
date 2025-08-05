const express = require('express');
const router = express.Router();
const { addPaymentMethod, getPaymentMethods } = require('../controllers/paymentMethodController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getPaymentMethods)
  .post(protect, addPaymentMethod);

module.exports = router;
